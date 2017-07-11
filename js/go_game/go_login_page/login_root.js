/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.theHtmlObject = new LoginHtmlObject(this);
        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId());

        this.phwangLinkObject().setHttpInfo();
    };

    this.objectName = function () {
        return "LoginRootObject";
    };

    this.gotoNextPage = function () {
        window.open(this.phwangLinkObject().serverHttpHeader() + "go_config.html", "_self")
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

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.receiveSetupLinkResponse = function () {
        this.gotoNextPage();
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
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

