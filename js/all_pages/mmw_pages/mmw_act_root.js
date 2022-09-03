/*
  Copyrights reserved
  Written by Paul Hwang
*/
function MmwRootActObject() {
    "use strict";
    this.init__ = function() {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.theAjaxObject = new mmwAjaxClass(this);
        this.theHtmlObject = new mmwHtmlObject(this);
        this.phwangAjaxObject().mmwReadDataRequest("read", "");
        //this.phwangAjaxObject().triggerGetMmwData();
        this.debug(true, "init__", this.objectName());
    };
    this.objectName = function() {return "MmwRootActObject";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.htmlObject = function() {return this.theHtmlObject;};
    this.ajaxObject = function() {return this.theAjaxObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function(str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function(str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}
function mmwHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {this.theRootObject = root_object_val; this.setupHtmlInput();};
    this.setupHtmlInput = function() {
        var this0 = this;
        $(".mmw_section .mmw_start_button").on("click", function() {
            var filename = $(".mmw_section .mmw_file_name").val();
            this0.debug(true, "setupHtmlInput", " filename=" + filename);
            if (filename) {
                this0.phwangAjaxObject().mmwReadDataRequest(filename);
            }
        });
    };
    this.objectName = function() {return "mmwHtmlObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.ajaxObject = function() {return this.rootObject().ajaxObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
function mmwAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {this.theRootObject = root_object_val;};
    this.receiveMmwReadDataResponse = function(result_val) {
        this.debug(true, "mmwReadDataResponse", "result_val=" + result_val);
        var data = JSON.parse(result_val);
        if (data.result === "succeed") {
            this.debug(true, "mmwReadDataResponse", "succeed");
            //this.phwangAjaxObject().mmwReadDataRequest("read", "");
        }
        else {
            this.abend("mmwReadDataResponse", "bad result" + data.result);
        }
    };
    this.receiveGetNameListResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function(result_val) {};
    this.receiveGetSessionDataResponse = function(result_val, data_val) {};
    this.objectName = function() {return "mmwAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
var mmw_act_main = function() {"use strict"; new MmwRootActObject();};
$(document).ready(mmw_act_main);
