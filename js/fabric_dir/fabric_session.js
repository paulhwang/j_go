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
            //console.log("FabricSessionObject.getSessionInfoFromStorage() null session_id");
            //abend();
            //return -1;
        }

        this.groupMode_ = sessionStorage.getItem("group_mode");
        if (this.groupMode_ === undefined) {
            //console.log("FabricSessionObject.getSessionInfoFromStorage() undefined group_mode");
            //abend();
            //return -1;
        }

        this.themeType_ = sessionStorage.getItem("theme_type");
        if (this.themeType_ === null) {
            //console.log("FabricSessionObject.getSessionInfoFromStorage() null theme_type");
            //abend();
            //return -1;
        }

        this.themeData_ = sessionStorage.getItem("theme_data");
        if (this.themeData_ === null) {
            //console.log("FabricSessionObject.getSessionInfoFromStorage() null theme_data");
            //abend();
            //return -1;
        }

        this.firstFiddle_ = sessionStorage.getItem("first_fiddle");
        if (this.firstFiddle_ === null) {
            //console.log("FabricSessionObject.getSessionInfoFromStorage() null first_fiddle");
            //abend();
            //return -1;
        }

        this.secondFiddle_ = sessionStorage.getItem("second_fiddle");
        if (this.secondFiddle_ === null) {
            //console.log("FabricSessionObject.getSessionInfoFromStorage() null second_fiddle");
            //abend();
            //return -1;
        }

        return 0;
    };

    this.printSessionInfo = function() {
        console.log("FabricSessionObject.getSessionInfoFromStorage() session_id="    + this.sessionId());
        console.log("FabricSessionObject.getSessionInfoFromStorage() group_mode="    + this.groupMode());
        console.log("FabricSessionObject.getSessionInfoFromStorage() theme_type="    + this.themeType());
        console.log("FabricSessionObject.getSessionInfoFromStorage() theme_data="    + this.themeData());
        console.log("FabricSessionObject.getSessionInfoFromStorage() first_fiddle="  + this.firstFiddle());
        console.log("FabricSessionObject.getSessionInfoFromStorage() second_fiddle=" + this.secondFiddle());
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
