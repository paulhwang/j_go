/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricResponseObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;

        this.initResponseProcessSwitchTable();

        this.httpServiceObject_ = new FabricHttpServiceObject(this.parseAndSwitchFabricResponse, this);

        ///////////this.sendGetLinkDataRequest();
    };

    this.setCallbackFunc = function(func_val, object_val) {
        this.setupSessionCallbackFunc_ = func_val;
        this.setupSessionCallbackObject_ = object_val;
    };

    this.initResponseProcessSwitchTable = function() {
        this.responseSwitchTable_ = {
            "get_link_data": this.processGetLinkDataResponse,
            "get_name_list": this.processGetNameListResponse,
            "setup_session": this.processSetupSessionResponse,
            "setup_session2": this.processSetupSession2Response,
            "setup_session3": this.processSetupSession3Response,
            "put_session_data": this.processPutSessionDataResponse,
            "get_session_data": this.processGetSessionDataResponse,
        };
    };

    this.parseAndSwitchFabricResponse = function(json_response_val) {
        console.log("FabricSessionSetupObject.parseAndSwitchFabricResponse() json_response_val=" + json_response_val);
        const response = JSON.parse(json_response_val);

        console.log("FabricSessionSetupObject.parseAndSwitchFabricResponse() response.data=" + response.data);
        const data = JSON.parse(response.data);

        var func = this.responseSwitchTable()[response.command];
        if (!func) {
            console.log("FabricSessionSetupObject.parseAndSwitchFabricResponse() bad_command=" + response.command);
            abend();
            return;
        }

        this.clearPendingAjaxRequestCommand();
        func.bind(this)(data);
    };

    this.processGetLinkDataResponse = function(data_val) {
        console.log("FabricSessionSetupObject.processGetLinkDataResponse() data_val.result=" + data_val.result);
        console.log("FabricSessionSetupObject.processGetLinkDataResponse() data_val.name_list_tag=" + data_val.name_list_tag);

        const name_list_tag = this.decodeNumber(data_val.name_list_tag, data_val.name_list_tag.length)
        console.log("FabricSessionSetupObject.processGetLinkDataResponse() name_list_tag=" + name_list_tag);
        this.linkObject().setServerNameListTag(name_list_tag);
        if (this.linkObject().nameListUpdateNeeded()) {
            this.sendGetNameListRequest(this.linkObject().nameListTag());
        }

        console.log("FabricSessionSetupObject.processGetLinkDataResponse() data_val.data=" + data_val.data);
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

            console.log("FabricSessionSetupObject.processGetLinkDataResponse() not_supported+command=" + data_val);
            abend();
            data_val = data_val.slice(data_val.length);
        }

        if (data_val.length !== 0) {
            console.log("FabricSessionSetupObject.processGetLinkDataResponse() length=" + data_val.length);
        }
    };

    this.processGetNameListResponse = function(data_val) {
        if (data_val) {
            if (data_val.c_name_list) {
                const name_list_tag  = this.decodeNumber(data_val.c_name_list, 3);
                this.linkObject().setNameListTag(name_list_tag);

                const name_list = data_val.c_name_list.slice(3);
                console.log("FabricSessionSetupObject.processGetNameListResponse() name_list_tag=" + name_list_tag);
                console.log("FabricSessionSetupObject.processGetNameListResponse() name_list=" + name_list);
                const array = JSON.parse("[" + name_list + "]");
                console.log("FabricSessionSetupObject.processGetNameListResponse() array=" + array);
                this.linkObject().setNameList(array);
                //this.phwangPortObject().receiveGetNameListResponse();
            }
        }
    };

    this.processSetupSessionResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObject().setSessionInfoIntoStorage(data_val.session_id, data.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())();
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) almost_succeed");
            this.fabricRequestObject().sendSetupSession3Request(data_val.session_id);
        }
        else if (data_val.result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) account_not_exist");
        }
        else {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) invalid_result=" + data_val.result);
        }
    };

    this.processSetupSession3Response = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricRequestObject.examineResponse(setup_session3) succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObject().setSessionInfoIntoStorage(data_val.session_id, data_val.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())();
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricRequestObject.examineResponse(setup_session3) almost_succeed");
            this.sendSetupSession3Request(data_val.session_id);
        }
        else {
            console.log("FabricRequestObject.examineResponse(setup_session) invalid_result=" + data_val.result);
        }
    };

    this.processPutSessionDataResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricSessionPutGetObject.examineResponse(put_session_data) succeed! session_id=", data_val.session_id);
            this.putCallbackFunc().bind(this.putCallbackObject())(data_val.result_data);
        }
        if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricSessionPutGetObject.examineResponse(put_session_data) in_progress! session_id=", data_val.session_id);
            this.fabricRequestObject().sendGetSessionDataRequest();
        }
        else {
            console.log("FabricSessionPutGetObject.examineResponse(put_session_data) invalid_result=" + data_val.result);
        }
    };

    this.processGetSessionDataResponse = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricSessionPutGetObject.examineResponse(get_session_data) succeed! session_id=", data_val.session_id);
            this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())(data_val.result_data);
        }
        if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricSessionPutGetObject.examineResponse(get_session_data) in_progress! session_id=", data_val.session_id);
            this.sendGetSessionDataRequest();
        }
        else {
            console.log("FabricSessionPutGetObject.examineResponse(get_session_data) invalid_result=" + data_val.result);
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
    this.setupSessionCallbackFunc = () => this.setupSessionCallbackFunc_;
    this.setupSessionCallbackObject = () => this.setupSessionCallbackObject_;
    this.init__(root_object_val);
};
