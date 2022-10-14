/*
  Copyrights reserved
  Written by Paul Hwang
*/

function UFabricObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.httpXmtObj_ = new HttpXmtClass(this);

        this.linkObj_ = new LinkObject();
        console.log("UFabricObject.init__() link_id=" + sessionStorage.getItem("link_id"));
        if (this.linkObj().validLinkId()) {
            this.linkObj().getLinkInfoFromStorage();
            this.linkObj().printLinkInfo();

            this.sessionObj_ = new SessionObject();
            console.log("UFabricObject.init__() session_id=" + sessionStorage.getItem("session_id"));
            if (this.sessionObj().validSessionId()) {
                this.sessionObj().getSessionInfoFromStorage();
                this.sessionObj().printSessionInfo();
            }

            this.httpXmtObj().startWatchDog();
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
        console.log("UFabricObject.logoutRequest() sessionStorage link_id=" + sessionStorage.getItem("link_id"));
        console.log("UFabricObject.logoutRequest() this.linkObj().linkId()=" + this.linkObj().linkId());
        console.log("UFabricObject.logoutRequest() data=" + data);

        this.httpXmtObj().stopWatchDog();

        if (this.sessionObj() !== null) {
            this.sessionObj().removeSessionInfoFromStorage();
        }
        this.linkObj().removeLinkInfoFromStorage();

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

    this.setupSession2Request = function(session_id_val, answer_val) {
        const data = "2Y" + this.linkObj().linkId() + session_id_val + answer_val;
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

    this.getSessionDataRequest = function(session_id_val) {
        const data = "2G" + this.linkObj().linkId() + session_id_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.datagramRequest = function() {
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.linkObj_;
    this.httpXmtObj = () => this.httpXmtObj_;
    this.sessionObj = () => this.sessionObj_;
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.httpReqObj = () => this.dFabricObj().httpReqObj();
    this.init__(root_obj_val);
};
