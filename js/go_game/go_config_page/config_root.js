/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.phwangLinkObject().setIsActive(true);
        this.phwangAjaxObject().setWatchDog(this.phwangLinkObject());
        //this.phwangAjaxObject().getLinkData(this.phwangLinkObject());

        this.theConfigStorageObject = new GoConfigStorageObject(this);
        this.theHtmlObject = new ConfigHtmlObject(this);
        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId());
    };

    this.objectName = function () {
        return "ConfigRootObject";
    };

    this.gotoNextPage = function () {
        window.open(this.phwangLinkObject().serverHttpHeader() + "go_act.html", "_self")
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.phwangAjaxObject = function () {
        return this.phwangObject().phwangAjaxObject();
    };

    this.phwangLinkObject = function () {
        return this.phwangObject().phwangLinkObject();
    };

    this.phwangSessionObject = function () {
        return this.phwangObject().phwangSessionObject();
    };

    this.configStorageObject = function () {
        return this.theConfigStorageObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.receiveSetupSessionResponse = function () {
        this.gotoNextPage();
    };

    this.receiveSetupSessionReplyResponse = function () {
        this.gotoNextPage();
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
        return this.logit_(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.abend_(this.objectName() + "." + str1_val, str2_val);
    };

    this.logit_ = function (str1_val, str2_val) {
        this.phwangObject().LOG_IT(str1_val, str2_val);
    };

    this.abend_ = function (str1_val, str2_val) {
        this.phwangObject().ABEND(str1_val, str2_val);
    };

    this.init__();
}

