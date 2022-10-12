/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricRequestObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;

        this.httpXmtObj_ = new HttpXmtClass(this);

        this.linkObj_ = new FabricLinkObject();

        const link_id_ = sessionStorage.getItem("link_id");
        if (link_id_ !== null) {
            this.linkObj().getLinkInfoFromStorage();
            this.linkObj().printLinkInfo();

            this.sessionObj_ = new FabricSessionObject();
            this.sessionObj().getSessionInfoFromStorage();
            this.sessionObj().printSessionInfo();

            if (this.linkObj().alreadyLogin()) {
                this.httpXmtObj().startWatchDog();
            }
         }
   };

    this.registerRequest = function(my_name_val, password_val, email_val) {
        const data =  "0R" + ENCODE.encodeString(my_name_val) + ENCODE.encodeString(password_val) + ENCODE.encodeString(email_val);
        const output = JSON.stringify({
                command: "register",
                data: data,
                });
        console.log("FabricRequestObject.registerRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.loginRequest = function(my_name_val, password_val) {
        const data = "0I" + ENCODE.encodeString(my_name_val) + ENCODE.encodeString(password_val);
        const output = JSON.stringify({
                command: "login",
                packet_id: sessionStorage.ajax_packet_id,
                data: data,
                });
        console.log("FabricRequestObject.loginRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.logoutRequest = function() {
        const data = this.linkObj().timeStamp() + "1O" + this.linkObj().linkId();
        const output = JSON.stringify({
                command: "logout",
                //time_stamp: sessionStorage.time_stamp,
                data: data,
                });
        console.log("FabricRequestObject.logoutRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
     };

    this.getLinkDataRequest = function() {
        const data = this.linkObj().timeStamp() + "1D" + this.linkObj().linkId();
        const output = JSON.stringify({
                command: "get_link_data",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
                });
        //console.log("FabricRequestObject.getLinkDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.getNameListRequest = function(name_list_tag_val) {
        const data = this.linkObj().timeStamp() + "1N" + this.linkObj().linkId() + name_list_tag_val;
        const output = JSON.stringify({
                command: "get_name_list",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
                });
        console.log("FabricRequestObject.getNameListRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSessionRequest = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        const data = this.linkObj().timeStamp() + "1S" + this.linkObj().linkId()
                        + group_mode_val + theme_type_val
                        + ENCODE.encodeString(theme_data_val)
                        + ENCODE.encodeString(this.linkObj().myName())
                        + ENCODE.encodeString(second_fiddle_val);
        const output = JSON.stringify({
                command: "setup_session",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
                });
        console.log("FabricRequestObject.setupSessionRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSession2Request = function(session_id_val) {
        const answer = 'Y';
        const data = this.linkObj().timeStamp() + "2Y" + this.linkObj().linkId() + session_id_val + answer;
        const output = JSON.stringify({
                command: "setup_session2",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
                });
        console.log("FabricRequestObject.setupSession2Request() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.setupSession3Request = function(session_id_val) {
        const data = this.linkObj().timeStamp() + "2Z" + this.linkObj().linkId() + session_id_val;
        const output = JSON.stringify({
                command: "setup_session3",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
                });
        console.log("FabricRequestObject.setupSession3Request() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.putSessionDataRequest = function(data_val) {
        const data = this.linkObj().timeStamp() + "2P" + this.linkObj().linkId() + this.sessionObj().sessionId() + data_val;
        const output = JSON.stringify({
                command: "put_session_data",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
                });
        console.log("FabricRequestObject.putSessionDataRequest() output=" + output);
        this.httpXmtObj().transmitAjaxRequest(output); 
    };

    this.getSessionDataRequest = function() {
        const data = this.linkObj().timeStamp() + "2G" + this.linkObj().linkId() + this.sessionObj().sessionId();
        const output = JSON.stringify({
                command: "get_session_data",
                //time_stamp: this.linkObj().timeStamp(),
                data: data,
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
