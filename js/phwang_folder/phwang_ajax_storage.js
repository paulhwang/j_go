/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxStorageObject (phwang_ajax_object_val) {
    "use strict";

    this.storage = function () {
        return localStorage;
    };

    this.init__ = function (phwang_ajax_object_val) {
        this.thePhwangAjaxObject = phwang_ajax_object_val;
        this.debug(false, "init__", "");
    };

    this.objectName = function () {
        return "PhwangAjaxStorageObject";
    };

    this.phwangAjaxObject = function () {
        return this.thePhwangAjaxObject;
    };

    this.phwangObject = function () {
        return this.phwangAjaxObject().phwangObject();
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

    this.init__(phwang_ajax_object_val);
}
