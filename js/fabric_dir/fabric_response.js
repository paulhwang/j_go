/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricResponseObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;

        this.initSwitchTable();

        this.httpServiceObject_ = new FabricHttpServiceObject(this.parseFabricResponse, this);

        ///////////this.sendGetLinkDataRequest();
    };

    this.setCallbackFunc = function(func_val, object_val) {
        this.callbackFunc_ = func_val;
        this.callbackObject_ = object_val;
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
        console.log("FabricResponseObject.parseFabricResponse() json_response_val=" + json_response_val);
        const response = JSON.parse(json_response_val);

        console.log("FabricResponseObject.parseFabricResponse() response.data=" + response.data);
        const data = JSON.parse(response.data);

        var func = this.responseSwitchTable()[response.command];
        if (!func) {
            console.log("FabricResponseObject.parseFabricResponse() bad_command=" + response.command);
            abend();
            return;
        }

        this.clearPendingAjaxRequestCommand();
        func.bind(this)(data);
    };

    this.getLinkDataResponse = function(data_val) {
        console.log("FabricResponseObject.getLinkDataResponse() data_val.result=" + data_val.result);
        console.log("FabricResponseObject.getLinkDataResponse() data_val.name_list_tag=" + data_val.name_list_tag);

        const name_list_tag = this.decodeNumber(data_val.name_list_tag, data_val.name_list_tag.length)
        console.log("FabricResponseObject.getLinkDataResponse() name_list_tag=" + name_list_tag);
        this.linkObject().setServerNameListTag(name_list_tag);


        ////////////////////////////////////////////////// move out*********************
        if (this.linkObject().nameListUpdateNeeded()) {
            this.fabricRequestObject().getNameListRequest(this.linkObject().nameListTag());
        }
        //**************************************************

        console.log("FabricResponseObject.getLinkDataResponse() data_val.data=" + data_val.data);
        let data = data_val.data;
        while (data_val.length > 0) {
            /*
            if (data_val.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_NAME_LIST()) {
                data_val = data_val.slice(1);
                var name_list_tag  = this.phwangObject().decodeNumber(data_val, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE());
                if (name_list_tag > this.phwangLinkObject().nameListTag()) {
                    this.phwangLinkObject().setServerNameListTag(name_list_tag);
                }
                data_val = data_val.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE());
                continue;
            }
            */

            /*
            if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION()) {
                this.debug(true, "getLinkDataResponse", "pending_session_data=" + data);
                var session_id = data.slice(1, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE() + 1);
                this.debug(true, "getLinkDataResponse", "session_id=" + session_id);
                data = data.slice(1 + this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE());
                var theme_data = data;
                this.debug(true, "getLinkDataResponse", "theme_data=" + theme_data);
                var config_len = this.phwangObject().decodeNumber(theme_data.slice(1), 3);
                var theme_data = theme_data.slice(0, config_len);
                this.rootObject().configObject().decodeConfig(theme_data);
                this.rootObject().configObject().putStorageConfigData();
                data = data.slice(config_len);
                this.setupSession2(this.phwangLinkObject(), theme_data, session_id);
                continue;
            }

            if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION3()) {
                this.debug(true, "getLinkDataResponse", "pending_session_data3=" + data);
                var session_id = data.slice(1, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE() + 1);
                this.debug(true, "getLinkDataResponse", "session_id=" + session_id);
                data = data.slice(1 + this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE());
                this.setupSession3(this.phwangLinkObject(), session_id);
                continue;
            }

            if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_DATA()) {
                var link_session_id = data.slice(1, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_LINK_SESSION_ID_SIZE() + 1);
                this.debug(true, "getLinkDataResponse", "link_session_id=" + link_session_id);
                this.pendingSessionDataQueueObject().enqueueData(link_session_id);
                data = data.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_LINK_SESSION_ID_SIZE() + 1);
                continue;
            }
            */

            console.log("FabricResponseObject.getLinkDataResponse() not_supported+command=" + data_val);
            abend();
            data_val = data_val.slice(data_val.length);
        }

        if (data_val.length !== 0) {
            console.log("FabricResponseObject.getLinkDataResponse() length=" + data_val.length);
        }
    };

    this.getNameListResponse = function(data_val) {
        if (data_val) {
            if (data_val.c_name_list) {
                const name_list_tag  = this.decodeNumber(data_val.c_name_list, 3);
                this.linkObject().setNameListTag(name_list_tag);

                const name_list = data_val.c_name_list.slice(3);
                console.log("FabricResponseObject.getNameListResponse() name_list_tag=" + name_list_tag);
                console.log("FabricResponseObject.getNameListResponse() name_list=" + name_list);
                const array = JSON.parse("[" + name_list + "]");
                console.log("FabricResponseObject.getNameListResponse() array=" + array);
                this.linkObject().setNameList(array);
                //this.phwangPortObject().receiveGetNameListResponse();
            }
        }
    };

    this.setupSessionResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSessionResponse() succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObject().setSessionInfoIntoStorage(data_val.session_id, data.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())();
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.setupSessionResponse() almost_succeed");
            this.fabricRequestObject().setupSession3Request(data_val.session_id);
        }
        else if (data_val.result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("FabricResponseObject.setupSessionResponse() account_not_exist");
        }
        else {
            console.log("FabricResponseObject.setupSessionResponse() invalid_result=" + data_val.result);
        }
    };

    this.setupSession3Response = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.setupSession3Response() succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObject().setSessionInfoIntoStorage(data_val.session_id, data_val.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.callbackFunc().bind(this.callbackObject())();
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
            this.putCallbackFunc().bind(this.putCallbackObject())(data_val.result_data);
        }
        if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricResponseObject.putSessionDataResponse() in_progress! session_id=", data_val.session_id);
            this.fabricRequestObject().getSessionDataRequest();
        }
        else {
            console.log("FabricResponseObject.putSessionDataResponse() invalid_result=" + data_val.result);
        }
    };

    this.getSessionDataResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricResponseObject.getSessionDataResponse() succeed! session_id=", data_val.session_id);
            this.callbackFunc().bind(this.callbackObject())(data_val.result_data);
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

    };

    this.decodeNumber = function(input_val, size_val) {
        var output = 0;
        for (var index = 0; index < size_val; index++) {
            output *= 10;
            output += input_val.charAt(index) - '0';
        }
        return output;
    };

    this.sleepMilliseconds = function (milliseconds_val) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds_val){
                break;
            }
        }
    };

    this.rootObject = () => this.rootObject_;
    this.responseSwitchTable = () => this.responseSwitchTable_;
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.linkObject = () => this.fabricRequestObject().linkObject();
    this.httpServiceObject = () => this.httpServiceObject_;
    this.sessionObject = () => this.fabricRequestObject().sessionObject();
    this.callbackFunc = () => this.callbackFunc_;
    this.callbackObject = () => this.callbackObject_;
    this.init__(root_object_val);
};
