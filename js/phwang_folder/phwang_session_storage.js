/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangSessionStorageObject (phwang_session_object_val) {
    "use strict";

    this.storage = function () {
        return localStorage;
    };

    this.init__ = function (phwang_session_object_val) {
        this.thePhwangSessionObject = phwang_session_object_val;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "PhwangSessionStorageObject";
    };

    this.phwangSessionObject = function () {
        return this.thePhwangSessionObject;
    };

    this.phwangObject = function () {
        return this.phwangSessionObject().phwangObject();
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

    this.init__(phwang_session_object_val);
}
