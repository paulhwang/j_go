/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpServiceObject(callback_func_val, callback_object_val) {
    "use strict";
    this.init__ = function() {
        this.theCallBackFunc = callback_func_val;
        this.theCallBackObject = callback_object_val;
        this.theHttpGetRequest = new XMLHttpRequest();
        this.startAjaxWaiting();
    };

    this.startAjaxWaiting = function() {
        const this0 = this;
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
        const next_ajax_packet_id = Number(sessionStorage.ajax_packet_id) + 1;
        if (next_ajax_packet_id !== 1 + Number(sessionStorage.ajax_packet_id)) {
            this.abend("HttpServiceObject.incrementAjaxPacketId()", "fix it");
        }
        sessionStorage.ajax_packet_id = next_ajax_packet_id;
    };

    this.httpGetRequest = () => this.theHttpGetRequest;
    this.callBackFunc = () => this.theCallBackFunc;
    this.callBackObject = () => this.theCallBackObject;
    this.ajaxRoute = () => "/django_go/go_ajax/";
    this.jsonContext = () => "application/json; charset=utf-8";
    this.plainTextContext = () => "text/plain; charset=utf-8";
    this.init__();
};
