/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangClass () {
    "use strict";

    this.init__ = function () {
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "PhwangClass";
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__();
}

