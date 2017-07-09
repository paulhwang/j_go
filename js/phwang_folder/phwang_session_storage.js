/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SessionStorageObject (phwang_object_val) {
    "use strict";

    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.theStorage = localStorage;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "SessionStorageObject";
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.hisName = function () {
        return this.storage().his_name;
    };

    this.setHisName = function (val) {
        this.storage().his_name = val;
    };

    this.sessionId = function () {
        return this.storage().session_id;
    };

    this.setSessionId = function (val) {
        this.storage().session_id = val;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(phwang_object_val);
}
