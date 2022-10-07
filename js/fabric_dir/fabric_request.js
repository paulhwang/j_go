/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricRequestObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;

        this.linkObject_ = new FabricLinkObject();
        this.linkObject().getLinkInfoFromStorage();

        this.sessionObject_ = new FabricSessionObject();
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

    this.sendGetNameListRequest = function(name_list_tag_val) {
        var output = JSON.stringify({
                command: "get_name_list",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                name_list_tag: name_list_tag_val,
                });
        console.log("FabricSessionSetupObject.sendGetNameListRequest() output=" + output);
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
        console.log("FabricRequestObject.sendSetupSessionRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
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

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.fabricSessionSetupObject = () => this.rootObject().fabricSessionSetupObject();
    this.httpServiceObject = () => this.fabricSessionSetupObject().httpServiceObject();
    this.init__(root_object_val);
};
