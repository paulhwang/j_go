/*
  Copyrights reserved
  Written by Paul Hwang
  File name: tajax_object.js
*/


function PhwangAjaxClass(phwang_object_val) {
    "use strict";

    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.thePhwangAjaxStorageObject = new PhwangAjaxStorageObject(this);

        this.thePacketId = 1;
        this.theHttpGetRequest = new XMLHttpRequest();
        this.setupReceiveAjaxResponse();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "PhwangAjaxClass";
    };

    this.debugOutput = function () {
        return false;
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.phwangAjaxStorageObject = function () {
        return this.thePhwangAjaxStorageObject;
    };

    this.rootObject = function () {
        return this.phwangObject().rootObject();
    };

    this.phwangLinkObject = function () {
        return this.phwangObject().phwangLinkObject();
    };

    this.rAjaxObject = function () {
        return this.rootObject().rAjaxObject();
    };

    this.ajaxRoute = function () {
        return "/django_go/go_ajax/";
    };

    this.jsonContext = function () {
        return "application/json; charset=utf-8";
    }
    this.plainTextContext = function () {
        return "text/plain; charset=utf-8";
    }

    this.httpGetRequest = function () {
        return this.theHttpGetRequest;
    };

    this.packetId = function () {
        return this.thePacketId;
    };

    this.incrementPacketId = function () {
        this.phwangAjaxStorageObject().incrementAjaxPacketId();
        this.thePacketId += 1;
    };

    this.setupReceiveAjaxResponse = function () {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.switchAjaxResponseData(this0.httpGetRequest().responseText);
            }
        };
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        if (response.command === "setup_link") {
            this.debug(true, "switchAjaxResponseData", "command=" + response.command + " data=" + response.data);
            var data = JSON.parse(response.data);
            this.rootObject().mallocLinkObject(data.my_name, data.link_id);
        } else {
            this.rAjaxObject().parseAjaxResponseData(response);
        }
    };

    this.transmitAjaxRequest = function (output_val) {
        this.debug(true, "transmitAjaxRequest", "output=" + output_val);
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("gorequest", output_val);
        this.httpGetRequest().setRequestHeader("GOPACKETID", this.packetId());
        this.incrementPacketId();
        this.httpGetRequest().send(null);
    };

    this.setupLink = function (root_val) {
        var output = JSON.stringify({
                        command: "setup_link",
                        my_name: root_val.myName(),
                        });
        this.debug_(true, this.debugOutput(), "setupLink", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getLinkData = function (link_val) {
        var output = JSON.stringify({
                        command: "get_link_data",
                        my_name: link_val.myName(),
                        link_id_index: link_val.linkId(),
                        });
        this.debug_(false, this.debugOutput(), "getLinkData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getNameList = function (link_val) {
        var output = JSON.stringify({
                        command: "get_name_list",
                        my_name: link_val.myName(),
                        link_id_index: link_val.linkId(),
                        name_list_tag: link_val.nameListTag(),
                        });
        this.debug_(true, this.debugOutput(), "getNameList", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSession = function (link_val, topic_data_val, theme_data_val, his_name_val) {
        var output = JSON.stringify({
                        command: "setup_session",
                        my_name: link_val.myName(),
                        link_id_index: link_val.linkId(),
                        his_name: his_name_val,
                        theme_data: theme_data_val,
                        topic_data: topic_data_val,
                        });
        this.debug_(true, this.debugOutput(), "setupSession", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSessionReply = function (link_val, data_val, session_id_index_val) {
        var data = JSON.parse(data_val);
        var output = JSON.stringify({
                        command: "setup_session_reply",
                        my_name: link_val.myName(),
                        link_id_index: link_val.linkId(),
                        accept: "yes",
                        topic_data: data.topic_data,
                        session_id_index: session_id_index_val,
                        });
        this.debug_(true, this.debugOutput(), "setupSessionReply", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getSessionData = function (session_val) {
        var output = JSON.stringify({
                        command: "get_session_data",
                        link_id_index: session_val.phwangLinkObject().linkId(),
                        session_id_index: session_val.sessionId(),
                        });
        this.debug_(true, this.debugOutput(), "getSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.putSessionData = function (session_val, data_val) {
        var output = JSON.stringify({
                        command: "put_session_data",
                        my_name: session_val.phwangLinkObject().myName(),
                        link_id_index: session_val.phwangLinkObject().linkId(),
                        session_id_index: session_val.sessionId(),
                        his_name: session_val.hisName(),
                        xmt_seq: session_val.xmtSeq(),
                        data: data_val,
                        });
        session_val.incrementXmtSeq();
        this.debug_(true, this.debugOutput(), "putSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.debug_ = function (debug_val, debug_val_, str1_val, str2_val) {
        if (debug_val && debug_val_) {
            this.logit(str1_val, str2_val);
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

    this.init__(phwang_object_val);
}

