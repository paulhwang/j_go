/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpServiceObject(callback_func_val, callback_object_val) {
    this.init__ = function() {
        this.theCallBackFunc = callback_func_val;
        this.theCallBackObject = callback_object_val;
        this.ajaxRoute = function() {return "/django_go/go_ajax/";};
        this.jsonContext = function() {return "application/json; charset=utf-8";}
        this.plainTextContext = function() {return "text/plain; charset=utf-8";}
        this.theHttpGetRequest = new XMLHttpRequest();
        this.startAjaxWaiting();
    };

    this.startAjaxWaiting = function() {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.callBackFunc().bind(this0.callBackObject())(this0.httpGetRequest().responseText);
            }
        };
    };

    this.sendAjaxRequest = function(output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("phwangajaxrequest", output_val);
        this.httpGetRequest().setRequestHeader("phwangajaxpacketid", sessionStorage.ajax_packet_id);
        this.incrementAjaxPacketId();
        this.httpGetRequest().send(null);
    };

    this.incrementAjaxPacketId = function() {
        console.log("HttpServiceObject.incrementAjaxPacketId() ajax_packet_id=" + sessionStorage.ajax_packet_id);
        var i = Number(sessionStorage.ajax_packet_id) + 1;
        if (i !== 1 + Number(sessionStorage.ajax_packet_id)) {
            this.abend("HttpServiceObject.incrementAjaxPacketId()", "fix it");
        }
        sessionStorage.ajax_packet_id = i;
    };

    this.httpGetRequest = function() {return this.theHttpGetRequest;};
    this.callBackFunc = function() {return this.theCallBackFunc;};
    this.callBackObject = function() {return this.theCallBackObject;};
    this.init__();
};
