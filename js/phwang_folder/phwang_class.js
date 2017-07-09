/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangClass (root_val) {
    "use strict";

    this.initObject = function () {
        this.thePhwangAjaxObject = new PhwangAjaxClass(this);
        this.thePhwangLinkObject = new PhwangLinkClass(this);
        this.thePhwangSessionObject = new PhwangSessionClass(this.phwangLinkObject());

        this.debug(true, "initObject", "");
    };

    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.thePhwangAjaxStorageObject = new PhwangAjaxStorageObject(this);
        this.thePhwangLinkStorageObject = new PhwangLinkStorageObject(this);
        this.thePhwangSessionStorageObject = new PhwangSessionStorageObject(this);

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

    this.phwangLinkObject = function () {
        return this.thePhwangLinkObject;
    };

    this.phwangSessionObject = function () {
        return this.thePhwangSessionObject;
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

