/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.phwangAjaxObject().setWatchDog(this.phwangLinkObject());

        this.theConfigStorageObject = new GoConfigStorageObject(this);
        this.theAjaxObject = new ConfigAjaxClass(this);
        this.theHtmlObject = new ConfigHtmlObject(this);
        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId());
    };

    this.receiveSetupSessionResponse = function () {
        this.htmlObject().gotoNextPage();
    };

    this.receiveSetupSessionReplyResponse = function () {
        this.htmlObject().gotoNextPage();
    };

    this.mallocLinkObject = function (name_val, id_val) {
        /* nothing is done here */
    };

    this.objectName = function () {return "ConfigRootObject";};
    this.phwangObject = function () {return this.thePhwangObject;};
    this.phwangAjaxObject = function () {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function () {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function () {return this.phwangObject().phwangSessionObject();};
    this.configStorageObject = function () {return this.theConfigStorageObject;};
    this.ajaxObject = function () {return this.theAjaxObject;};
    this.htmlObject = function () {return this.theHtmlObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {return this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {return this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function (str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function (str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}
