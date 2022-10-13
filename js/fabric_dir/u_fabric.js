/*
  Copyrights reserved
  Written by Paul Hwang
*/

function UFabricObject(root_obj_val) {
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
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.loginRequest = function(my_name_val, password_val) {
        const data = "0I" + ENCODE.encodeString(my_name_val) + ENCODE.encodeString(password_val);
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.logoutRequest = function() {
        const data = "1O" + this.linkObj().linkId();
        this.httpXmtObj().transmitAjaxRequest(data); 
     };

    this.getLinkDataRequest = function() {
        const data = "1D" + this.linkObj().linkId();
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.getNameListRequest = function(name_list_tag_val) {
        const data = "1N" + this.linkObj().linkId() + name_list_tag_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.setupSessionRequest = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        const data = "1S" + this.linkObj().linkId()
                        + group_mode_val + theme_type_val
                        + ENCODE.encodeString(theme_data_val)
                        + ENCODE.encodeString(this.linkObj().myName())
                        + ENCODE.encodeString(second_fiddle_val);
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.setupSession2Request = function(session_id_val) {
        const answer = 'Y';
        const data = "2Y" + this.linkObj().linkId() + session_id_val + answer;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.setupSession3Request = function(session_id_val) {
        const data = "2Z" + this.linkObj().linkId() + session_id_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.putSessionDataRequest = function(data_val) {
        const data = "2P" + this.linkObj().linkId() + this.sessionObj().sessionId() + data_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.getSessionDataRequest = function() {
        const data = "2G" + this.linkObj().linkId() + this.sessionObj().sessionId();
        this.httpXmtObj().transmitAjaxRequest(data); 
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