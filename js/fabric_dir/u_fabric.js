/*
  Copyrights reserved
  Written by Paul Hwang
*/

function UFabricObject(root_obj_val) {
    "use strict";
     this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.httpXmtObj_ = new HttpXmtClass(this);

        this.linkObj_ = new LinkObject(root_obj_val);
        console.log("UFabricObject.init__() link_id=" + this.linkObj().linkId());
        if (this.linkObj().validLinkId()) {
            this.linkObj().printLinkInfo();

            this.httpXmtObj().startWatchDog();
         }
   };

    this.registerRequest = function(my_name_val, password_val, email_val) {
        const data =  "0R" + ENCODE.encodeString(my_name_val) + ENCODE.encodeString(password_val) + ENCODE.encodeString(email_val);
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.loginRequest = (my_name_val, password_val) => {
        const data = "0I" + ENCODE.encodeString(my_name_val) + ENCODE.encodeString(password_val);
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.logoutRequest = () => {
        const data = "1O" + this.linkObj().linkId();
        console.log("UFabricObject.logoutRequest() data=" + data);

        this.httpXmtObj().setTimeStampsForLogout(this.linkObj().nodeTimeStamp() + this.linkObj().fabricTimeStamp());
        this.httpXmtObj().stopWatchDog();

        this.linkObj().removeLinkInfoFromStorage();

        this.httpXmtObj().transmitAjaxRequest(data); 
     };

    this.getLinkDataRequest = () => {
        const data = "1D" + this.linkObj().linkId();
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.getNameListRequest = (name_list_tag_val) => {
        const data = "1N" + this.linkObj().linkId() + name_list_tag_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.setupSessionRequest = (theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) => {
        const data = "1S" + this.linkObj().linkId()
                        + group_mode_val + theme_type_val
                        + ENCODE.encodeString(theme_data_val)
                        + ENCODE.encodeString(this.linkObj().myName())
                        + ENCODE.encodeString(second_fiddle_val);
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.setupSession2Request = (session_id_val, answer_val) => {
        const data = "2Y" + this.linkObj().linkId() + session_id_val + answer_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.setupSession3Request = (session_id_val) => {
        const data = "2Z" + this.linkObj().linkId() + session_id_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.putSessionDataRequest = (data_val) => {
        const data = "2P" + this.linkObj().linkId() + this.sessionObj().sessionId() + data_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.getSessionDataRequest = (session_id_val) => {
        const data = "2G" + this.linkObj().linkId() + session_id_val;
        this.httpXmtObj().transmitAjaxRequest(data); 
    };

    this.datagramRequest = () => {
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.linkObj_;
    this.httpXmtObj = () => this.httpXmtObj_;
    this.sessionObj = () => this.linkObj().sessionObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.httpReqObj = () => this.dFabricObj().httpReqObj();
    this.init__(root_obj_val);
};
