/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricResponseObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;

        this.initSwitchTable();

        this.httpServiceObj_ = new FabricHttpServiceObject(this.parseFabricResponse, this);

        ///////////this.sendGetLinkDataRequest();
    };

    this.setCallbackFunc = function(func_val, obj_val) {
        this.callbackFunc_ = func_val;
        this.callbackObj_ = obj_val;
    };

    this.initSwitchTable = function() {
        this.responseSwitchTable_ = {
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session": this.setupSessionResponse,
            "setup_session2": this.setupSession2Response,
            "setup_session3": this.setupSession3Response,
            "put_session_data": this.putSessionDataResponse,
            "get_session_data": this.getSessionDataResponse,
        };
    };

    this.parseFabricResponse = function(json_response_val) {
        //console.log("FabricResponseObject.parseFabricResponse() json_response_val=" + json_response_val);
        const response = JSON.parse(json_response_val);

        if (response.command !== "get_link_data") {
            console.log("FabricResponseObject.parseFabricResponse() command=" + response.command + " data=" + response.data);
        }

        const func = this.responseSwitchTable()[response.command];
        if (!func) {
            console.log("FabricResponseObject.parseFabricResponse() bad_command=" + response.command);
            abend();
            return;
        }

        this.clearPendingAjaxRequestCommand();

        const data = JSON.parse(response.data);
        func.bind(this)(data);
    };

    this.getLinkDataResponse = function(data_val) {
        //console.log("FabricResponseObject.getLinkDataResponse() data_val.data=" + data_val.data);

        let data = data_val.data;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        let remaining_data = data.slice(index);

        while (remaining_data.length > 0) {
            let index = 0;
            let type = remaining_data.charAt(index);
            //console.log("FabricResponseObject.getLinkDataResponse() type=" + type);
            index++;

            if (type === FE_DEF.GET_LINK_DATA_TYPE_NAME_LIST()) {
                const name_list_tag = remaining_data.slice(index, index + FE_DEF.NAME_LIST_TAG_SIZE());
                index += FE_DEF.NAME_LIST_TAG_SIZE();

                this.linkObj().setServerNameListTag(name_list_tag);

                //console.log("FabricResponseObject.getLinkDataResponse() name_list_tag=" + name_list_tag);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_DATA()) {
                let pending_data = remaining_data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
                index += FE_DEF.SESSION_ID_SIZE();

                this.fabricRequestObj().getSessionDataRequest();

                console.log("FabricResponseObject.getLinkDataResponse() pending_data=" + pending_data);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_SESSION2()) {
                let len_str = remaining_data.slice(index, index + FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                index += FE_DEF.GET_LINK_DATA_LENGTH_SIZE();

                let len = this.decodeNumber(len_str, FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                let pending_session2 = remaining_data.slice(index, index + len);
                index += len;

                const session_id = pending_session2.slice(0, FE_DEF.SESSION_ID_SIZE());
                this.fabricRequestObj().setupSession2Request(session_id);

                console.log("FabricResponseObject.getLinkDataResponse() pending_session2=" + pending_session2);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_SESSION3()) {
                let len_str = remaining_data.slice(index, index + FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                index += FE_DEF.GET_LINK_DATA_LENGTH_SIZE();

                let len = this.decodeNumber(len_str, FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                let pending_session3 = remaining_data.slice(index, index + len);
                index += len;

                this.fabricRequestObj().setupSession3Request(pending_session3);

                console.log("FabricResponseObject.getLinkDataResponse() pending_session3=" + pending_session3);
            }

            remaining_data = remaining_data.slice(index);
        }

        if (remaining_data.length !== 0) {
            console.log("FabricResponseObject.getLinkDataResponse() remaining_data.length=" + remaining_data.length);
            abend();
        }
   };

    this.decodeNumber = function(input_val, size_val) {
        let output = 0;
        for (let index = 0; index < size_val; index++) {
            output *= 10;
            output += input_val.charAt(index) - '0';
        }
        return output;
    };

    this.getNameListResponse = function(data_val) {
        if (data_val.name_list) {
            const name_list_tag  = data_val.name_list.slice(0, FE_DEF.NAME_LIST_TAG_SIZE());
            console.log("FabricResponseObject.getNameListResponse() name_list_tag=" + name_list_tag);

            const name_list_data = data_val.name_list.slice(FE_DEF.NAME_LIST_TAG_SIZE());
            console.log("FabricResponseObject.getNameListResponse() name_list_data=" + name_list_data);

            const name_list_array = JSON.parse("[" + name_list_data + "]");
            console.log("FabricResponseObject.getNameListResponse() name_list_array=" + name_list_array);

            this.linkObj().setNameListTag(name_list_tag);
            this.linkObj().setNameList(name_list_array);
            this.callbackFunc().bind(this.callbackObj())("get_name_list", data_val);
        }
    };

    this.setupSessionResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSessionResponse() succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObj().setSessionInfoIntoStorage(data_val.session_id, data.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())();
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSessionResponse() almost_succeed");
            this.fabricRequestObject().setupSession3Request(data_val.session_id);
        }
        else if (data_val.result === FE_DEF.RESULT_WAITING_FOR_ANSWER()) {
            console.log("FabricResponseObject.setupSessionResponse() waiting_for_answer");
            //this.fabricRequestObject().setupSession3Request(data_val.session_id);
        }
        else if (data_val.result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("FabricResponseObject.setupSessionResponse() account_not_exist");
        }
        else {
            console.log("FabricResponseObject.setupSessionResponse() invalid_result=" + data_val.result);
        }
    };

    this.setupSession2Response = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSession2Response() succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObj().setSessionInfoIntoStorage(data_val.session_id, data_val.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.callbackFunc().bind(this.callbackObject())("setup_session2");
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSession2Response() almost_succeed");
            this.sendSetupSession3Request(data_val.session_id);
        }
        else {
            console.log("FabricResponseObject.setupSession2Response() invalid_result=" + data_val.result);
        }
    };

    this.setupSession3Response = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSession3Response() succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObj().setSessionInfoIntoStorage(data_val.session_id, data_val.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.callbackFunc().bind(this.callbackObj())("setup_session3");
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSession3Response() almost_succeed");
            this.sendSetupSession3Request(data_val.session_id);
        }
        else {
            console.log("FabricResponseObject.setupSession3Response() invalid_result=" + data_val.result);
        }
    };

    this.putSessionDataResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.putSessionDataResponse() succeed! session_id=", data_val.session_id);
            this.callbackFunc().bind(this.callbackObject())("put_session_data", data_val.result_data);
        }
        if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.putSessionDataResponse() in_progress! session_id=", data_val.session_id);
            this.callbackFunc().bind(this.callbackObj())("put_session_data", data_val.result_data);
            //this.fabricRequestObject().getSessionDataRequest();
        }
        else {
            console.log("FabricResponseObject.putSessionDataResponse() invalid_result=" + data_val.result);
        }
    };

    this.getSessionDataResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.getSessionDataResponse() succeed! session_id=", data_val.session_id);
            this.callbackFunc().bind(this.callbackObj())("get_session_data", data_val.result_data);
        }
        if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.getSessionDataResponse() in_progress! session_id=", data_val.session_id);
            this.getSessionDataRequest();
        }
        else {
            console.log("FabricResponseObject.getSessionDataResponse() invalid_result=" + data_val.result);
        }
    };

    this.clearPendingAjaxRequestCommand = function() {
        this.httpXmtObj().clearPendingAjaxRequestCommand();
    };

    this.sleepMilliseconds = function (milliseconds_val) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds_val){
                break;
            }
        }
    };

    this.rootObj = () => this.rootObj_;
    this.responseSwitchTable = () => this.responseSwitchTable_;
    this.fabricRequestObj = () => this.rootObj().fabricRequestObject();
    this.httpXmtObj = () => this.fabricRequestObj().httpXmtObj();
    this.linkObj = () => this.fabricRequestObj().linkObject();
    this.httpServiceObj = () => this.httpServiceObj_;
    this.sessionObj = () => this.fabricRequestObj().sessionObject();
    this.callbackFunc = () => this.callbackFunc_;
    this.callbackObj = () => this.callbackObj_;
    this.init__(root_obj_val);
};
