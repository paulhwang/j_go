/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function LoginAjaxClass(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.debug(true, "init__", "");
    };

    this.receiveSetupLinkResponse = function () {
    };

    this.receiveGetNameListResponse = function () {
    };

    this.receiveSetupSessionResponse = function () {
    };

    this.receiveSetupSessionReplyResponse = function () {
    };

    this.receiveGetSessionDataResponse = function (data_val) {
    };

    this.objectName = function() {return "LoginAjaxClass";};
    this.rootObject = function () {return this.theRootObject;};
    this.phwangObject = function () {return this.rootObject().phwangObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
