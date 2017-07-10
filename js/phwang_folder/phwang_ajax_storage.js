/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxStorageObject (phwang_ajax_object_val) {
    "use strict";

    this.storage = function () {
        return localStorage;
    };

    this.init__ = function (phwang_ajax_object_val) {
        this.thePhwangAjaxObject = phwang_ajax_object_val;
        this.resetAjaxStorage();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "PhwangAjaxStorageObject";
    };

    this.phwangAjaxObject = function () {
        return this.thePhwangAjaxObject;
    };

    this.phwangObject = function () {
        return this.phwangAjaxObject().phwangObject();
    };

    this.ajaxPacketId = function () {
        return this.storage().ajax_packet_id;
    };

    this.incrementAjaxPacketId = function () {
        var i = Number(this.storage().ajax_packet_id) + 1;
        if (i !== 1 + Number(this.storage().ajax_packet_id)) {
            this.abend("incrementAjaxPacketId", "fix it");
        }
        this.storage().ajax_packet_id = i;
    };

    this.resetAjaxStorage = function () {
        this.resetAjaxPacketId();
    };

    this.resetAjaxPacketId = function () {
        if (this.ajaxPacketId() === undefined) {
            this.storage().ajax_packet_id = 0;
        }
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(phwang_ajax_object_val);
}
