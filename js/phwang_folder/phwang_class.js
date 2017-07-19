/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangClass (root_val) {
    "use strict";
    this.init__ = function (root_val) {this.theRootObject = root_val;};

    this.initObject = function () {
        this.thePhwangAjaxObject = new PhwangAjaxClass(this);
        this.thePhwangLinkObject = new PhwangLinkClass(this);
        this.thePhwangSessionObject = new PhwangSessionClass(this.phwangLinkObject());
        this.thePhwangPortObject = new PhwangPortClass(this);
        this.debug(true, "initObject", "");
    };

    this.decodeNumber = function (input_val, size_val) {
        var index = 0;
        var output = 0;
        while (index < size_val) {
            output *= 10;
            output += input_val.charAt(index) - '0';
            index += 1;
        }
        return output;
    };

    this.objectName = function () {return "PhwangClass";};
    this.rootObject = function () {return this.theRootObject;};
    this.phwangAjaxObject = function () {return this.thePhwangAjaxObject;};
    this.phwangLinkObject = function () {return this.thePhwangLinkObject;};
    this.phwangSessionObject = function () {return this.thePhwangSessionObject;};
    this.phwangPortObject = function () {return this.thePhwangPortObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {return this.LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {return this.ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.LOG_IT = function (str1_val, str2_val) {window.console.log(str1_val + "() " + str2_val);};
    this.ABEND = function (str1_val, str2_val) {
        window.console.log("***ABEND*** " + str1_val + "() " + str2_val);
        window.alert("***ABEND*** " + str1_val + "() " + str2_val);
        var x = junk;
    };

    this.init__(root_val);
}

function PhwangPortClass (phwang_object_val) {
    "use strict";
    this.init__ = function (phwang_object_val) {this.thePhwangObject = phwang_object_val;};
    this.receiveSetupLinkResponse = function () {this.rootObject().ajaxObject().receiveSetupLinkResponse();};
    this.receiveGetNameListResponse = function () {this.rootObject().ajaxObject().receiveGetNameListResponse();};
    this.receiveSetupSessionResponse = function () {this.rootObject().ajaxObject().receiveSetupSessionResponse();};
    this.receiveSetupSession2Response = function () {this.rootObject().ajaxObject().receiveSetupSession2Response();};
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
