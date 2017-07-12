/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function LoginAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {this.theRootObject = root_object_val;};
    this.receiveSetupLinkResponse = function () {this.htmlObject().gotoNextPage();};
    this.receiveGetNameListResponse = function (name_list_array_val) {};
    this.receiveSetupSessionResponse = function () {};
    this.receiveSetupSessionReplyResponse = function () {};
    this.receiveGetSessionDataResponse = function (data_val) {};
    this.objectName = function() {return "LoginAjaxClass";};
    this.rootObject = function () {return this.theRootObject;};
    this.phwangObject = function () {return this.rootObject().phwangObject();};
    this.htmlObject = function () {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
