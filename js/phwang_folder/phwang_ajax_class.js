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

        this.initSwitchTable();
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

    this.phwangSessionObject = function () {
        return this.rootObject().phwangSessionObject();
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

    this.switchTable = function () {
        return this.theSwitchTable;
    }

    this.linkUpdateInterval = function () {
        return this.theLinkUpdateInterval;
    };

    this.setLinkUpdateInterval = function (val) {
        this.theLinkUpdateInterval = val;
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
            this.parseAjaxResponseData(response);
        }
    };

    this.parseAjaxResponseData = function (response_val) {
        var data = JSON.parse(response_val.data);
        if (!data) {
            return;
        }
        if (!this.phwangLinkObject().verifyLinkIdIndex(data.link_id_index)) {
            this.abend("parseAjaxResponseData", "link_id_index=" + data.link_id_index);
            return;
        }

        this.debug(true, "parseAjaxResponseData", "command=" + response_val.command + " data=" + response_val.data);

        var func = this.switchTable()[response_val.command];
        if (func) {
            func.bind(this)(response_val.data);
        }
        else {
            this.abend("switchAjaxResponseData", "bad command=" + response_val.command);
            return;
        }
    };

    this.initSwitchTable = function () {
        this.theSwitchTable = {
            "setup_link": this.setupLinkResponse,
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session": this.setupSessionResponse,
            "setup_session_reply": this.setupSessionReplyResponse,
            "get_session_data": this.getSessionDataResponse,
            "put_session_data": this.putSessionDataResponse,
        };
     };

    this.setupLinkResponse = function (input_val) {
        this.debug(false, "setupLinkResponse", "input_val=" + input_val);
   };

    this.getLinkDataResponse = function (input_val) {
        this.debug(false, "getLinkDataResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.setLinkUpdateInterval(data.interval);

            if (data.pending_session_data) {
                this.debug(true, "getLinkDataResponse", "pending_session_data=" + data.pending_session_data);
                var i = 0;
                while (i >= 0) {
                    var session_id = data.pending_session_data[i];
                    var session = this.sessionMgrObject().searchSessionBySessionId(session_id);
                    if (session) {
                        this.tAjaxObject().getSessionData(session);
                    }
                    i -= 1;
                }
            }

            if (data.pending_session_setup) {
                this.debug(true, "getLinkDataResponse", "pending_session_setup=" + data.pending_session_setup);
                //this.ajaxObject().setupSessionReply(this, data.pending_session_setup, null);
            }


            if (data.c_data) {
                var c_data = data.c_data;
                var name_list_tag;
                var index = 0;
                name_list_tag  = (c_data.charAt(index++) - '0') * 100;
                name_list_tag += (c_data.charAt(index++) - '0') *  10;
                name_list_tag += (c_data.charAt(index++) - '0');
                if (name_list_tag > this.phwangLinkObject().nameListTag()) {
                    this.getNameList(this.phwangLinkObject());
                }
                c_data = c_data.slice(3);
            }

            if (data.c_pending_session_setup != "") {
                var data_session_id_index = data.c_pending_session_setup.slice(1, 9);
                var theme_name = data.c_pending_session_setup.slice(9, 11);
                var theme_config = data.c_pending_session_setup.slice(11);
                this.setupSessionReply(this, data.pending_session_setup, data_session_id_index);
            }

        }

        setTimeout(function(link_val) {
            link_val.debug(false, "getLinkDataResponse:timer", "setTimeout");
            link_val.phwangAjaxObject().getLinkData(link_val);
        }, this.linkUpdateInterval(), this.phwangLinkObject());
    };

    this.getNameListResponse = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.c_name_list) {
                var name_list_tag;
                var index = 0;
                name_list_tag  = (data.c_name_list.charAt(index++) - '0') * 100;
                name_list_tag += (data.c_name_list.charAt(index++) - '0') * 10;
                name_list_tag += (data.c_name_list.charAt(index++) - '0');
                this.phwangLinkObject().setNameListTag(name_list_tag);

                var name_list = data.c_name_list.slice(3);
                this.debug(true, "getNameListResponse", "name_list_tag=" + name_list_tag);
                this.debug(true, "getNameListResponse", "name_list=" + name_list);
                var array = JSON.parse("[" + name_list + "]");
                this.debug(true, "getNameListResponse", "array=" + array);
                this.phwangLinkObject().setNameList(array);
                if (this.rootObject().htmlObject().renderNameListFuncExist()) {
                    this.rootObject().htmlObject().renderNameList();////////////////////////////
                }
            }
        }
    };

   this.setupSessionResponse = function (input_val) {
        this.debug(true, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.phwangSessionObject().setSessionId(data.session_id_index);
            this.debug(true, "setupSessionResponse", "sessionId=" + this.phwangSessionObject().sessionId());
            window.open(this.rootObject().nextPage(), "_self")
        }
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.phwangSessionStorageObject().setSessionId(data.session_id_index.slice(8));
            this.debug(true, "setupSessionReplyResponse", "sessionId=" + this.sessionStorageObject().sessionId());
            window.open(this.rootObject().nextPage(), "_self")
        }
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(true, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.phwangLinkObject().getSession(data.session_id_index);
            if (session) {
                this.getSessionData(session);
            }
        }
    };

    this.getSessionDataResponse = function (json_data_val) {
        this.debug(true, "getSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.debug(true, "getSessionDataResponse", "data=" + data.c_data);
            var session = this.phwangLinkObject().getSession(data.session_id_index);
            if (session) {
                session.receiveData(data.c_data);
            }
        }
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

    this.getSessionData = function (session_val) {
        var output = JSON.stringify({
                        command: "get_session_data",
                        link_id_index: session_val.phwangLinkObject().linkId(),
                        session_id_index: session_val.sessionId(),
                        });
        this.debug_(true, this.debugOutput(), "getSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.transmitAjaxRequest = function (output_val) {
        this.debug(true, "transmitAjaxRequest", "output=" + output_val);
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("gorequest", output_val);
        this.httpGetRequest().setRequestHeader("GOPACKETID", this.ajaxPacketId());
        this.incrementAjaxPacketId();
        this.httpGetRequest().send(null);
    };

    this.ajaxPacketId = function () {
        return this.phwangAjaxStorageObject().ajaxPacketId();
    };

    this.incrementAjaxPacketId = function () {
        this.phwangAjaxStorageObject().incrementAjaxPacketId();
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

