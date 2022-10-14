/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SessionObject() {
    "use strict";
    this.init__ = function() {
    }

    this.printSessionInfo = function() {
        console.log("SessionObject.printSessionInfo() session_id="    + this.sessionId());
        console.log("SessionObject.printSessionInfo() group_mode="    + this.groupMode());
        console.log("SessionObject.printSessionInfo() theme_type="    + this.themeType());
        console.log("SessionObject.printSessionInfo() theme_data="    + this.themeData());
        console.log("SessionObject.printSessionInfo() first_fiddle="  + this.firstFiddle());
        console.log("SessionObject.printSessionInfo() second_fiddle=" + this.secondFiddle());
    }

    this.setSessionInfoIntoStorage = function(session_id_val, group_mode_val, theme_type_val, theme_data_val, first_fiddle_val, second_fiddle_val) {
        sessionStorage.setItem("session_id",    session_id_val);
        sessionStorage.setItem("group_mode",    group_mode_val);
        sessionStorage.setItem("theme_type",    theme_type_val);
        sessionStorage.setItem("theme_data",    theme_data_val);
        sessionStorage.setItem("first_fiddle",  first_fiddle_val);
        sessionStorage.setItem("second_fiddle", second_fiddle_val);
    };

    this.removeSessionInfoFromStorage = function() {
        sessionStorage.removeItem("session_id");
        sessionStorage.removeItem("group_mode");
        sessionStorage.removeItem("theme_type");
        sessionStorage.removeItem("theme_data");
        sessionStorage.removeItem("first_fiddle");
        sessionStorage.removeItem("second_fiddle");
    };

    this.validSessionId = () => UTILS.validValue(this.sessionId());
    this.sessionId    = () => sessionStorage.getItem("session_id");
    this.groupMode    = () => sessionStorage.getItem("group_mode");
    this.themeType    = () => sessionStorage.getItem("theme_type");
    this.themeData    = () => sessionStorage.getItem("theme_data");
    this.firstFiddle  = () => sessionStorage.getItem("first_fiddle");
    this.secondFiddle = () => sessionStorage.getItem("second_fiddle");
    this.init__();
};
