/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function PhwangPortClass (phwang_object_val) {
    "use strict";
    this.init__ = function (phwang_object_val) {this.thePhwangObject = phwang_object_val;};
    this.receiveSetupLinkResponse = function () {this.rootObject().ajaxObject().receiveSetupLinkResponse();};
    this.receiveGetNameListResponse = function (name_list_array_val) {this.rootObject().ajaxObject().receiveGetNameListResponse(name_list_array_val);};
    this.receiveSetupSessionResponse = function () {this.rootObject().ajaxObject().receiveSetupSessionResponse();};
    this.receiveSetupSessionReplyResponse = function () {this.rootObject().ajaxObject().receiveSetupSessionReplyResponse();};
    this.receiveGetSessionDataResponse = function (data_val) {this.rootObject().ajaxObject().receiveSetupSessionResponse(data_val);};
    this.objectName = function() {return "PhwangPortClass";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.rootObject = function () {return this.phwangObject().rootObject();};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangSessionObject = function() {return this.phwangObject().phwangSessionObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_object_val);
}
