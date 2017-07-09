/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.theRAjaxObject = new RAjaxObject(this);
        this.thePhwangLinkObject = new PhwangLinkClass(this, this.phwangLinkStorageObject().userName(), this.phwangLinkStorageObject().linkIdIndex());
        this.theConfigStorageObject = new GoConfigStorageObject();
        this.theHtmlObject = new ConfigHtmlObject(this);
        this.debug(true, "init__", "userName=" + this.phwangLinkStorageObject().userName() + " linkIdIndex=" + this.phwangLinkStorageObject().linkIdIndex());
    };

    this.objectName = function () {
        return "ConfigRootObject";
    };

    this.nextPage = function () {
        return this.phwangLinkStorageObject().serverHttpHeader() + "go_act.html";
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.phwangAjaxObject = function () {
        return this.phwangObject().phwangAjaxObject();
    };

    this.phwangLinkObject = function () {
        return this.thePhwangLinkObject;
    };

    this.phwangSessionObject = function () {
        return this.thePhwangSessionObject;
    };

    this.phwangLinkStorageObject = function () {
        return this.phwangObject().phwangLinkStorageObject();
    };

    this.phwangSessionStorageObject = function () {
        return this.phwangObject().phwangSessionStorageObject();
    };

    this.configStorageObject = function () {
        return this.theConfigStorageObject;
    };

    this.rAjaxObject = function () {
        return this.theRAjaxObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.mallocLinkObject = function (name_val, id_val) {
        /* nothing is done here */
    };

    this.logit = function (str1_val, str2_val) {
        return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__();
}

