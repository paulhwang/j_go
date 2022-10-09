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
        this.linkObject().printLinkInfo();

        this.sessionObject_ = new FabricSessionObject();
        this.sessionObject().getSessionInfoFromStorage();
        this.sessionObject().printSessionInfo();

        this.httpXmtObj_ = new HttpXmtClass(this);
        this.httpXmtObj().startWatchDog();
    };

    this.getLinkDataRequest = function() {
        const output = JSON.stringify({
                command: "get_link_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                });
        //console.log("FabricRequestObject.getLinkDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.getNameListRequest = function(name_list_tag_val) {
        var output = JSON.stringify({
                command: "get_name_list",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                name_list_tag: name_list_tag_val,
                });
        console.log("FabricRequestObject.getNameListRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSessionRequest = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
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
        console.log("FabricRequestObject.setupSessionRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSession2Request = function(session_id_val) {
        const output = JSON.stringify({
                command: "setup_session2",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: session_id_val,
                answer: 'Y',
                });
        console.log("FabricRequestObject.setupSession2Request() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSession3Request = function(session_id_val) {
        const output = JSON.stringify({
                command: "setup_session3",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: session_id_val,
                });
        console.log("FabricRequestObject.setupSession3Request() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.putSessionDataRequest = function(data_val) {
        const output = JSON.stringify({
                command: "put_session_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: this.sessionObject().sessionId(),
                data: data_val,
                });
        console.log("FabricRequestObject.putSessionDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.getSessionDataRequest = function() {
        const output = JSON.stringify({
                command: "get_session_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: this.sessionObject().sessionId(),
                });
        console.log("FabricRequestObject.getSessionDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.httpServiceObject = () => this.fabricResponseObject().httpServiceObject();
    this.httpXmtObj = () => this.httpXmtObj_;
    this.init__(root_object_val);
};
