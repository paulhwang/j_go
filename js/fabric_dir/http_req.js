/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricHttpReqObject(callback_func_val, callback_obj_val) {
    "use strict";
    this.init__ = () => {
        this.callBackFunc_ = callback_func_val;
        this.callBackObj_ = callback_obj_val;
        this.xmlHttpRequest_ = new XMLHttpRequest();
        this.startAjaxWaiting();
    };

    this.startAjaxWaiting = () => {
        const this0 = this;
        this.xmlHttpRequest().onreadystatechange = function() {
            if ((this0.xmlHttpRequest().readyState === 4) &&
                (this0.xmlHttpRequest().status === 200)) {
                this0.callBackFunc().bind(this0.callBackObj())(this0.xmlHttpRequest().responseText);
            }
        };
    };

    this.sendAjaxRequest = (output_val) => {
        this.xmlHttpRequest().open("GET", this.ajaxRoute(), true);
        this.xmlHttpRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.xmlHttpRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.xmlHttpRequest().setRequestHeader("phwangajaxrequest", output_val);
        this.xmlHttpRequest().setRequestHeader("phwangajaxpacketid", this.ajaxPacketId());
        this.incrementAjaxPacketId();
        this.xmlHttpRequest().send(null);
    };

    this.incrementAjaxPacketId = () => {sessionStorage.setItem("ajax_packet_id", Number(this.ajaxPacketId()) + 1);};
    this.ajaxPacketId = () => sessionStorage.getItem("ajax_packet_id");
    this.xmlHttpRequest = () => this.xmlHttpRequest_;
    this.callBackFunc = () => this.callBackFunc_;
    this.callBackObj = () => this.callBackObj_;
    this.ajaxRoute = () => "/django_go/go_ajax/";
    this.jsonContext = () => "application/json; charset=utf-8";
    this.plainTextContext = () => "text/plain; charset=utf-8";
    this.init__();
};
