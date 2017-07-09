/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AjaxStorageObject (phwang_object_val) {
    "use strict";

    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.theStorage = localStorage;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "AjaxStorageObject";
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.storage = function () {
        return this.theStorage;
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
