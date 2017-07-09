/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangClass (root_val) {
    "use strict";

    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.thePhwangAjaxStorageObject = new AjaxStorageObject(this);
        this.thePhwangLinkStorageObject = new LinkStorageObject(this);
        this.thePhwangSessionStorageObject = new SessionStorageObject(this);
        this.thePhwangAjaxObject = new PhwangAjaxClass(this);

        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "PhwangClass";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.phwangAjaxStorageObject = function () {
        return this.thePhwangAjaxStorageObject;
    };

    this.phwangLinkStorageObject = function () {
        return this.thePhwangLinkStorageObject;
    };

    this.phwangSessionStorageObject = function () {
        return this.thePhwangSessionStorageObject;
    };

    this.phwangAjaxObject = function () {
        return this.thePhwangAjaxObject;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.LOG_IT = function (str1_val, str2_val) {
        window.console.log(str1_val + "() " + str2_val);
    };

    this.ABEND = function (str1_val, str2_val) {
        window.console.log("***ABEND*** " + str1_val + "() " + str2_val);
        window.alert("***ABEND*** " + str1_val + "() " + str2_val);
        var x = junk;
    };

    this.init__(root_val);
}

