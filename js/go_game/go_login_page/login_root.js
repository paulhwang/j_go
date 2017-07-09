/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangLinkStorageObject().resetLinkStorage();
        this.theAjaxObject = new LoginAjaxObject(this);
        this.theHtmlObject = new LoginHtmlObject(this);
        this.debug(true, "init__", "myName=" + this.phwangLinkStorageObject().myName() + " linkId=" + this.phwangLinkStorageObject().linkId());

        this.phwangLinkStorageObject().setHttpInfo();
    };

    this.objectName = function () {
        return "LoginRootObject";
    };

    this.nextPage = function () {
        return this.phwangLinkStorageObject().serverHttpHeader() + "go_config.html";
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

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
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

    this.init__();
}

