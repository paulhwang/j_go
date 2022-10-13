/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricHttpReqObject(callback_func_val, callback_object_val) {
    "use strict";
    this.init__ = function() {
        this.callBackFunc_ = callback_func_val;
        this.callBackObject_ = callback_object_val;
        this.xmlHttpRequest_ = new XMLHttpRequest();
        this.startAjaxWaiting();
    };

    this.startAjaxWaiting = function() {
        const this0 = this;
        this.xmlHttpRequest().onreadystatechange = function() {
            if ((this0.xmlHttpRequest().readyState === 4) &&
                (this0.xmlHttpRequest().status === 200)) {
                this0.callBackFunc().bind(this0.callBackObject())(this0.xmlHttpRequest().responseText);
            }
        };
    };

    this.sendAjaxRequest = function(output_val) {
        this.xmlHttpRequest().open("GET", this.ajaxRoute(), true);
        this.xmlHttpRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.xmlHttpRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.xmlHttpRequest().setRequestHeader("phwangajaxrequest", output_val);
        this.xmlHttpRequest().setRequestHeader("phwangajaxpacketid", sessionStorage.ajax_packet_id);
        this.incrementAjaxPacketId();
        this.xmlHttpRequest().send(null);
    };

    this.incrementAjaxPacketId = function() {
        //console.log("FabricHttpReqObject.incrementAjaxPacketId() ajax_packet_id=" + sessionStorage.ajax_packet_id);
        const next_ajax_packet_id = Number(sessionStorage.ajax_packet_id) + 1;
        if (next_ajax_packet_id !== 1 + Number(sessionStorage.ajax_packet_id)) {
            this.abend("FabricHttpReqObject.incrementAjaxPacketId()", "fix it");
        }
        sessionStorage.ajax_packet_id = next_ajax_packet_id;
    };

    this.xmlHttpRequest = () => this.xmlHttpRequest_;
    this.callBackFunc = () => this.callBackFunc_;
    this.callBackObject = () => this.callBackObject_;
    this.ajaxRoute = () => "/django_go/go_ajax/";
    this.jsonContext = () => "application/json; charset=utf-8";
    this.plainTextContext = () => "text/plain; charset=utf-8";
    this.init__();
};
