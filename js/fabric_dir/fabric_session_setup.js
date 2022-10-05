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

        this.httpServiceObject_ = new FabricHttpServiceObject(this.examineResponse, this);
        this.sendGetLinkDataRequest();
    };

    this.setCallbackFunc = function(func_val, object_val) {
        this.setupSessionCallbackFunc_ = func_val;
        this.setupSessionCallbackObject_ = object_val;
    };

    this.examineResponse = function(json_response_val) {
        console.log("FabricSessionSetupObject.examineResponse() json_response_val=" + json_response_val);
        const response = JSON.parse(json_response_val);

        console.log("FabricSessionSetupObject.examineResponse() response.data=" + response.data);
        const data = JSON.parse(response.data);

        if (response.command === "get_link_data") {
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {

                this.sendGetLinkDataRequest();
            }
            else {
                //tbd
            }
        }

        else if (response.command === "setup_session") {
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
                console.log("FabricSessionSetupObject.examineResponse(setup_session) succeed! session_id=", data.session_id);
                if (data.room_status === FE_DEF.FE_ROOM_STATUS_READY()) {
                    this.sessionObject().setSessionInfoIntoStorage(data.session_id, data.group_mode, data.theme_type, data.theme_data, data.first_fiddle, data.second_fiddle);
                    this.setupSessionCallbackFunc().bind(this.setupSessionCallbackObject())();
                }
                else {
                }
            }
            else if (data.result === FE_DEF.FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
                console.log("FabricSessionSetupObject.examineResponse(setup_session) account_not_exist");
            }
            else {
                console.log("FabricSessionSetupObject.examineResponse(setup_session) invalid_result=" + data.result);
            }
        }

        else {
            abend();
        }
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

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.setupSessionCallbackFunc = () => this.setupSessionCallbackFunc_;
    this.setupSessionCallbackObject = () => this.setupSessionCallbackObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__(root_object_val);
};
