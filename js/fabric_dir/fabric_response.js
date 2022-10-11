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
        let data = data_val.data;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        data = data.slice(index);

        const name_list_tag = data.slice(0, FE_DEF.NAME_LIST_TAG_SIZE());
        console.log("FabricResponseObject.getNameListResponse() name_list_tag=" + name_list_tag);

        const name_list_data = data.slice(FE_DEF.NAME_LIST_TAG_SIZE());
        console.log("FabricResponseObject.getNameListResponse() name_list_data=" + name_list_data);

        const name_list_array = JSON.parse("[" + name_list_data + "]");
        console.log("FabricResponseObject.getNameListResponse() name_list_array=" + name_list_array);

        this.linkObj().setNameListTag(name_list_tag);
        this.linkObj().setNameList(name_list_array);
        this.callbackFunc().bind(this.callbackObj())("get_name_list", data_val);
    };

    this.setupSessionResponse = function(data_val) {
        let data = data_val.data;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSessionResponse() succeed! session_id=", data_val.session_id);
        }
        else if (result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSessionResponse() almost_succeed");
            this.fabricRequestObject().setupSession3Request(session_id);
        }
        else if (result === FE_DEF.RESULT_WAITING_FOR_ANSWER()) {
            console.log("FabricResponseObject.setupSessionResponse() waiting_for_answer");
            //this.fabricRequestObject().setupSession3Request(session_id);
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("FabricResponseObject.setupSessionResponse() account_not_exist");
        }
        else {
            console.log("FabricResponseObject.setupSessionResponse() invalid_result=" + result);
        }
    };

    this.setupSession2Response = function(data_val) {
        let index = 0;
        const result = data_val.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data_val.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data_val.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        const theme_type = data_val.charAt(index);
        index++;

        const theme_info = data_val.slice(index);


        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSession2Response() succeed! session_id=", session_id);
        }
        else if (result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSession2Response() almost_succeed");
            this.sendSetupSession3Request(session_id);
        }
        else {
            console.log("FabricResponseObject.setupSession2Response() invalid_result=" + result);
        }
    };

    this.setupSession3Response = function(data_val) {
        let data = data_val.data;
        var index = 0;

        var result = data.slice(index, index + 2);
        index += 2;

        var link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        var session_id = data.slice(index, index + 8);
        index += FE_DEF.SESSION_ID_SIZE();

        const room_status = data[index++];
        const group_mode = data[index++];
        const theme_type = data[index++];

        const encoded_theme_data = data.slice(index);
        console.log("theme=" + encoded_theme_data);
        const theme_data = this.decodeString(encoded_theme_data);
        const theme_data_len = this.decodeStringGetLength(encoded_theme_data);
        index += theme_data_len;

        const encoded_first_fiddle = data.slice(index);
        const first_fiddle = this.decodeString(encoded_first_fiddle);
        const first_fiddle_len = this.decodeStringGetLength(encoded_first_fiddle);
        index += first_fiddle_len;

        const encoded_second_fiddle = data.slice(index);
        const second_fiddle = this.decodeString(encoded_second_fiddle);
        const second_fiddle_len = this.decodeStringGetLength(encoded_second_fiddle);
        index += second_fiddle_len;

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSession3Response() succeed! session_id=", session_id);
            if (room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObj().setSessionInfoIntoStorage(session_id, group_mode, theme_type, theme_data, first_fiddle, second_fiddle);
                this.callbackFunc().bind(this.callbackObj())("setup_session3");
            }
            else {
            }
        }
        else if (result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSession3Response() almost_succeed");
            this.sendSetupSession3Request(session_id);
        }
        else {
            console.log("FabricResponseObject.setupSession3Response() invalid_result=" + result);
        }
    };

    this.decodeString = function(input_val)
    {
        let length = 0;
        let buf = "";
        let length_str;

        switch (input_val.charAt(0)) {
            case '1':
                length_str = input_val.slice(1, 1 + 1);
                length = this.decodeNumber(length_str, 1);
                buf = input_val.slice(1 + 1, 1 + 1 + length);
                return buf;

            case '2':
                length_str = input_val.slice(1, 1 + 2);
                length = this.decodeNumber(length_str, 2);
                buf = input_val.slice(1 + 2, 1 + 2 + length);
                return buf;

            case '3':
                length_str = input_val.slice(1, 1 + 3);
                length = this.decodeNumber(length_str, 3);
                buf = input_val.slice(1 + 3, 1 + 3 + length);
                return buf;

            case '4':
                length_str = input_val.slice(1, 1 + 4);
                length = this.decodeNumber(length_str, 4);
                buf = input_val.slice(1 + 4, 1 + 4 + length);
                return buf;

            case '5':
                length_str = input_val.slice(1, 1 + 5);
                length = this.decodeNumber(length_str, 5);
                buf = input_val.slice(1 + 5, 1 + 5 + length);
                return buf;

            default:
                console.log("EncodeClass.decodeString() TBD");
                abend();
                return buf;
        }
    };

    this.decodeStringGetLength = function(input_val) {
        let length = 0;
        let length_str;

        switch (input_val.charAt(0)) {
            case '1':
                length_str = input_val.slice(1, 1 + 1);
                length = this.decodeNumber(length_str, 1);
                return length + 1 + 1;

            case '2':
                length_str = input_val.slice(1, 1 + 2);
                length = this.decodeNumber(length_str, 2);
                return length + 1 + 2;

            case '3':
                length_str = input_val.slice(1, 1 + 3);
                length = this.decodeNumber(length_str, 3);
                return length + 1 + 3;

            case '4':
                length_str = input_val.slice(1, 1 + 4);
                length = this.decodeNumber(length_str, 4);
                return length + 1 + 4;

            case '5':
                length_str = input_val.slice(1, 1 + 5);
                length = this.decodeNumber(length_str, 5);
                return length + 1 + 5;

            default:
                console.log("EncodeClass.decodeStringGetLength() TBD");
                abend();
                return length;
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
