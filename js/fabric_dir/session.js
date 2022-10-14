/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricSessionObject() {
    "use strict";
    this.init__ = function() {
    }

    this.getSessionInfoFromStorage = function() {
        this.sessionId_ = sessionStorage.getItem("session_id");
        if (this.sessionId_ === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null session_id");
            abend();
        }

        this.groupMode_ = sessionStorage.getItem("group_mode");
        if (this.groupMode_ === undefined) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() undefined group_mode");
            abend();
        }

        this.themeType_ = sessionStorage.getItem("theme_type");
        if (this.themeType_ === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null theme_type");
            abend();
        }

        this.themeData_ = sessionStorage.getItem("theme_data");
        if (this.themeData_ === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null theme_data");
            abend();
        }

        this.firstFiddle_ = sessionStorage.getItem("first_fiddle");
        if (this.firstFiddle_ === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null first_fiddle");
            abend();
        }

        this.secondFiddle_ = sessionStorage.getItem("second_fiddle");
        if (this.secondFiddle_ === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null second_fiddle");
            abend();
        }
    };

    this.printSessionInfo = function() {
        console.log("FabricSessionObject.printSessionInfo() session_id="    + this.sessionId());
        console.log("FabricSessionObject.printSessionInfo() group_mode="    + this.groupMode());
        console.log("FabricSessionObject.printSessionInfo() theme_type="    + this.themeType());
        console.log("FabricSessionObject.printSessionInfo() theme_data="    + this.themeData());
        console.log("FabricSessionObject.printSessionInfo() first_fiddle="  + this.firstFiddle());
        console.log("FabricSessionObject.printSessionInfo() second_fiddle=" + this.secondFiddle());
    }

    this.setSessionInfoIntoStorage = function(session_id_val, group_mode_val, theme_type_val, theme_data_val, first_fiddle_val, second_fiddle_val) {
        sessionStorage.setItem("session_id",    session_id_val);
        sessionStorage.setItem("group_mode",    group_mode_val);
        sessionStorage.setItem("theme_type",    theme_type_val);
        sessionStorage.setItem("theme_data",    theme_data_val);
        sessionStorage.setItem("first_fiddle",  first_fiddle_val);
        sessionStorage.setItem("second_fiddle", second_fiddle_val);
    };

    this.sessionId    = () => this.sessionId_;
    this.groupMode    = () => this.groupMode_;
    this.themeType    = () => this.themeType_;
    this.themeData    = () => this.themeData_;
    this.firstFiddle  = () => this.firstFiddle_;
    this.secondFiddle = () => this.secondFiddle_;
    this.init__();
};
