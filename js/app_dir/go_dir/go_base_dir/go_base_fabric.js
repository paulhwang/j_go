/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricSessionSetupObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.httpServiceObject_ = new HttpServiceObject(this.examineResponse, this);
    };

    this.examineResponse = function(json_response_val) {
        console.log("GoBaseFabricObject.examineResponse() json_response_val=" + json_response_val);

        let response = JSON.parse(json_response_val);
        console.log("GoBaseFabricObject.examineResponse() response.data=" + response.data);

        if (response.command === "setup_solo") {
            let data = JSON.parse(response.data);
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
                console.log("GoBaseFabricObject.examineResponse(setup_solo) succeed! session_id=", data.session_id);
                if (data.room_status === FE_DEF.FE_ROOM_STATUS_READY()) {
                    this.sessionObject().setSessionInfoIntoStorage(data.session_id, data.group_mode, data.theme_type, data.theme_data, data.first_fiddle, data.second_fiddle);
                    window.open("go_play.html", "_self");
                }
                else {
                    //this.sendGetSessionSetupStatusRequest(data.session_id);
                }
            }
            else if (data.result === FE_DEF.FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
                console.log("GoBaseFabricObject.examineResponse(setup_solo) account_not_exist");
            }
            else {
                console.log("GoBaseFabricObject.examineResponse(setup_solo) invalid_result=" + data.result);
            }
        }
        else {
            abend();
        }
    };

    this.sendSetupSoloRequest = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        const output = JSON.stringify({
                command: "setup_solo",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                group_mode: group_mode_val,
                first_fiddle: this.linkObject().myName(),
                second_fiddle: second_fiddle_val,
                theme_type: theme_type_val,
                theme_data: theme_data_val,
                });
        console.log("GoBaseFabricObject.sendSetupSoloRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.sessionObject = () => this.rootObject().sessionObject();
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__(root_object_val);
};
