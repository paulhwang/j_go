/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SessionObject() {
    "use strict";
    this.init__ = function() {
    }

    this.getSessionInfoFromStorage = function() {
        this.sessionId_ = sessionStorage.getItem("session_id");
        if (this.sessionId_ === null) {
            console.log("SessionObject.getSessionInfoFromStorage() null session_id");
            abend();
        }

        this.groupMode_ = sessionStorage.getItem("group_mode");
        if (this.groupMode_ === undefined) {
            console.log("SessionObject.getSessionInfoFromStorage() undefined group_mode");
            abend();
        }

        this.themeType_ = sessionStorage.getItem("theme_type");
        if (this.themeType_ === null) {
            console.log("SessionObject.getSessionInfoFromStorage() null theme_type");
            abend();
        }

        this.themeData_ = sessionStorage.getItem("theme_data");
        if (this.themeData_ === null) {
            console.log("SessionObject.getSessionInfoFromStorage() null theme_data");
            abend();
        }

        this.firstFiddle_ = sessionStorage.getItem("first_fiddle");
        if (this.firstFiddle_ === null) {
            console.log("SessionObject.getSessionInfoFromStorage() null first_fiddle");
            abend();
        }

        this.secondFiddle_ = sessionStorage.getItem("second_fiddle");
        if (this.secondFiddle_ === null) {
            console.log("SessionObject.getSessionInfoFromStorage() null second_fiddle");
            abend();
        }
    };

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

    this.validSessionId = function () {
        const session_id = sessionStorage.getItem("session_id");
        return ((session_id !== null) && (session_id !== "null") && (session_id !== undefined));

    };

    this.sessionId    = () => this.sessionId_;
    this.groupMode    = () => this.groupMode_;
    this.themeType    = () => this.themeType_;
    this.themeData    = () => this.themeData_;
    this.firstFiddle  = () => this.firstFiddle_;
    this.secondFiddle = () => this.secondFiddle_;
    this.init__();
};
