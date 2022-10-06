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
