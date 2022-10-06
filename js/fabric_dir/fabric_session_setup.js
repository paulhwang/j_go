/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricSessionSetupObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;

        this.linkObject_ = new FabricLinkObject();
        this.linkObject().getLinkInfoFromStorage();

        this.sessionObject_ = new FabricSessionObject();

        this.initResponseProcessSwitchTable();
        this.httpServiceObject_ = new FabricHttpServiceObject(this.parseAndSwitchFabricResponse, this);
        this.sendGetLinkDataRequest();
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

    this.sendGetLinkDataRequest = function() {
        const output = JSON.stringify({
                command: "get_link_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                });
        console.log("FabricSessionSetupObject.sendGetLinkDataRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.processGetLinkDataResponse = function(data_val) {
        var data = data_val;
        while (data_val.length > 0) {
            if (data_val.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_NAME_LIST()) {
                data_val = data_val.slice(1);
                var name_list_tag  = this.phwangObject().decodeNumber(data_val, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE());
                if (name_list_tag > this.phwangLinkObject().nameListTag()) {
                    this.phwangLinkObject().setServerNameListTag(name_list_tag);
                }
                data_val = data_val.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE());
                continue;
            }

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

    this.sendGetNameListRequest = function(name_list_tag_val) {
        var output = JSON.stringify({
                command: "get_name_list",
                time_stamp: link_val.timeStamp(),
                link_id: this.linkObject().linkId(),
                name_list_tag: name_list_tag_val,
                });
        console.log("FabricSessionSetupObject.sendGetNameListRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.processGetNameListResponse = function(data_val) {
        if (data_val) {
            if (data_val.c_name_list) {
                var name_list_tag  = this.phwangObject().decodeNumber(data_val.c_name_list, 3);
                this.phwangLinkObject().setNameListTag(name_list_tag);

                var name_list = data_val.c_name_list.slice(3);
                console.log("FabricSessionSetupObject.processGetNameListResponse() name_list_tag=" + name_list_tag);
                console.log("FabricSessionSetupObject.processGetNameListResponse() name_list=" + name_list);
                var array = JSON.parse("[" + name_list + "]");
                console.log("FabricSessionSetupObject.processGetNameListResponse() array=" + array);
                this.phwangLinkObject().setNameList(array);
                this.phwangPortObject().receiveGetNameListResponse();
            }
        }
    };

    this.sendSetupSessionRequest = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        const output = JSON.stringify({
                command: "setup_session",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                group_mode: group_mode_val,
                first_fiddle: this.linkObject().myName(),
                second_fiddle: second_fiddle_val,
                theme_type: theme_type_val,
                theme_data: theme_data_val,
                });
        console.log("FabricSessionSetupObject.sendSetupSessionRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
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
            this.sendSetupSession3Request(data_val.session_id);
        }
        else if (data_val.result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) account_not_exist");
        }
        else {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) invalid_result=" + data_val.result);
        }
    };

    this.sendSetupSession3Request = function(session_id_val) {
        const output = JSON.stringify({
                command: "setup_session3",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: session_id_val,
                });
        console.log("FabricSessionSetupObject.sendSetupSessionRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.processSetupSession3Response = function(data_val) {
        if (data_val.result === FE_DEF.RESULT_SUCCEED()) {
            console.log("FabricSessionSetupObject.examineResponse(setup_session3) succeed! session_id=", data_val.session_id);
            if (data_val.room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObject().setSessionInfoIntoStorage(data_val.session_id, data_val.group_mode, data_val.theme_type, data_val.theme_data, data_val.first_fiddle, data_val.second_fiddle);
                this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())();
            }
            else {
            }
        }
        else if (data_val.result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("FabricSessionSetupObject.examineResponse(setup_session3) almost_succeed");
            this.sendSetupSession3Request(data_val.session_id);
        }
        else {
            console.log("FabricSessionSetupObject.examineResponse(setup_session) invalid_result=" + data_val.result);
        }
    };

    this.clearPendingAjaxRequestCommand = function() {

    };

    this.rootObject = () => this.rootObject_;
    this.responseSwitchTable = () => this.responseSwitchTable_;
    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.setupSessionCallbackFunc = () => this.setupSessionCallbackFunc_;
    this.setupSessionCallbackObject = () => this.setupSessionCallbackObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__(root_object_val);
};
