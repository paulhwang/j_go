/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function PhwangQueueClass (phwang_object_val) {
    "use strict";
    this.init__ = function (phwang_object_val) {this.thePhwangObject = phwang_object_val;};
    this.objectName = function() {return "PhwangQueueClass";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_object_val);
}
