/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricRequestObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;

        this.linkObj_ = new FabricLinkObject();
        this.linkObj().getLinkInfoFromStorage();
        this.linkObj().printLinkInfo();

        this.sessionObj_ = new FabricSessionObject();
        this.sessionObj().getSessionInfoFromStorage();
        this.sessionObj().printSessionInfo();

        this.httpXmtObj_ = new HttpXmtClass(this);
        if (this.linkObj().alreadyLogin()) {
            this.httpXmtObj().startWatchDog();
        }
    };

    this.registerRequest = function(my_name_val, password_val, email_val) {
        const output = JSON.stringify({
                command: "register",
                my_name: my_name_val,
                password: password_val,
                email: email_val,
                });
        console.log("FabricRequestObject.registerRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.loginRequest = function(my_name_val, password_val) {
        const output = JSON.stringify({
                command: "login",
                packet_id: sessionStorage.ajax_packet_id,
                my_name: my_name_val,
                password: password_val,
                });
        console.log("FabricRequestObject.loginRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.logoutRequest = function() {
        const output = JSON.stringify({
                command: "logout",
                //time_stamp: sessionStorage.time_stamp,
                link_id: this.linkObj().linkId(),
                //my_name: sessionStorage.my_name,
                });
        console.log("FabricRequestObject.logoutRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
     };

    this.getLinkDataRequest = function() {
        const output = JSON.stringify({
                command: "get_link_data",
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                });
        //console.log("FabricRequestObject.getLinkDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.getNameListRequest = function(name_list_tag_val) {
        const output = JSON.stringify({
                command: "get_name_list",
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                name_list_tag: name_list_tag_val,
                });
        console.log("FabricRequestObject.getNameListRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSessionRequest = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        const output = JSON.stringify({
                command: "setup_session",
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                group_mode: group_mode_val,
                first_fiddle: this.linkObj().myName(),
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
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                session_id: session_id_val,
                answer: 'Y',
                });
        console.log("FabricRequestObject.setupSession2Request() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSession3Request = function(session_id_val) {
        const output = JSON.stringify({
                command: "setup_session3",
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                session_id: session_id_val,
                });
        console.log("FabricRequestObject.setupSession3Request() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.putSessionDataRequest = function(data_val) {
        const output = JSON.stringify({
                command: "put_session_data",
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                session_id: this.sessionObj().sessionId(),
                data: data_val,
                });
        console.log("FabricRequestObject.putSessionDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.getSessionDataRequest = function() {
        const output = JSON.stringify({
                command: "get_session_data",
                time_stamp: this.linkObj().timeStamp(),
                link_id: this.linkObj().linkId(),
                session_id: this.sessionObj().sessionId(),
                });
        console.log("FabricRequestObject.getSessionDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.datagramRequest = function() {
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.linkObj_;
    this.sessionObj = () => this.sessionObj_;
    this.fabricResponseObject = () => this.rootObj().fabricResponseObject();
    this.httpReqObj = () => this.fabricResponseObject().httpReqObj();
    this.httpXmtObj = () => this.httpXmtObj_;
    this.init__(root_obj_val);
};
