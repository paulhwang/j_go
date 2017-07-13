/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxEngineClass(phwang_ajax_object_val) {
    "use strict";
    this.ajaxRoute = function () {return "/django_go/go_ajax/";};
    this.jsonContext = function () {return "application/json; charset=utf-8";}
    this.plainTextContext = function () {return "text/plain; charset=utf-8";}

    this.init__ = function (phwang_ajax_object_val) {
        this.thePhwangAjaxObject = phwang_ajax_object_val;
        this.theHttpGetRequest = new XMLHttpRequest();
        this.initAjaxResponseReceivePath();
        this.debug(false, "init__", "");
    };

    this.initAjaxResponseReceivePath = function () {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.phwangAjaxObject().parseAndSwitchAjaxResponse(this0.httpGetRequest().responseText);
            }
        };
    };

    this.sendAjaxRequest = function (output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("phwangajaxrequest", output_val);
        this.httpGetRequest().setRequestHeader("phwangpacketid", this.ajaxPacketId());
        this.incrementAjaxPacketId();
        this.httpGetRequest().send(null);
    };

    this.httpGetRequest = function () {return this.theHttpGetRequest;};
    this.objectName = function () {return "PhwangAjaxEngineClass";};
    this.phwangAjaxObject = function () {return this.thePhwangAjaxObject;};
    this.phwangAjaxStorageObject = function () {return this.phwangAjaxObject().phwangAjaxStorageObject();};
    this.phwangObject = function () {return this.phwangAjaxObject().phwangObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.ajaxPacketId = function () {return this.phwangAjaxObject().ajaxPacketId();};
    this.incrementAjaxPacketId = function () {this.phwangAjaxObject().incrementAjaxPacketId();};
    this.init__(phwang_ajax_object_val);
}
