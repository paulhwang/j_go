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
        this.thePendingAjaxRequestCommand = "";
        this.theAjaxRequestQueue = 0;
        this.debug(true, "init__", "");
    };

    this.resetKeepAliveTimer1 = function () {
        setTimeout(function(link_val) {
                        link_val.debug(false, "resetKeepAliveTimer", "setTimeout");
                        link_val.phwangAjaxObject().getLinkData(link_val);
                        }, this.linkUpdateInterval() * 30, this.phwangLinkObject());
    };

    this.setWatchDog = function (link_val) {
        setInterval(function (link_val) {
            var ajax_object = link_val.phwangAjaxObject();
            if (ajax_object.noPendingAjaxRequestCommand()) {
                var output = ajax_object.dequeueAjaxRequest();
                if (output) {
                    ajax_object.transmitAjaxRequest_(output);
                }
                else {
                    ajax_object.getLinkData(link_val);
                }
            }
            else {
                if (ajax_object.pendingAjaxRequestCommand() !== ajax_object.getLinkDataCommand()) {
                    link_val.debug(true, "PhwangAjaxClassWatchDog", ajax_object.pendingAjaxRequestCommand());
                }
            }
        }, 100, link_val);
    };

    this.debugOutput = function () {
        return false;
    };

    this.objectName = function () {return "PhwangAjaxClass";};
    this.phwangAjaxStorageObject = function () {return this.thePhwangAjaxStorageObject;};
    this.phwangObject = function () {return this.thePhwangObject;};
    this.rootObject = function () {return this.phwangObject().rootObject();};
    this.phwangLinkObject = function () {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function () {return this.rootObject().phwangSessionObject();};

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

    this.getLinkDataCommand = function () {
        return "get_link_data";
    };

    this.pendingAjaxRequestCommand = function () {
        return this.thePendingAjaxRequestCommand;
    };

    this.noPendingAjaxRequestCommand = function () {
        return (this.pendingAjaxRequestCommand() === "");
    };

    this.setPendingAjaxRequestCommand = function (command_val) {
        if (!this.noPendingAjaxRequestCommand()) {
            this.abend("*****setPendingAjaxRequestCommand", "old=" + this.pendingAjaxRequestCommand() + "new=" + command_val);
        }
        this.thePendingAjaxRequestCommand = command_val;
    };

    this.clearPendingAjaxRequestCommand = function () {
        this.thePendingAjaxRequestCommand = "";
    };

    this.checkPendingAjaxRequestCommand = function () {
        if (this.pendingAjaxRequestCommand() !== "") {
            this.logit("********************************", "__________________________________");
            this.logit("checkPendingAjaxRequestCommand", this.pendingAjaxRequestCommand());
        }
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

        if (response.command !== this.getLinkDataCommand()) {
            this.debug(true, "switchAjaxResponseData", this.pendingAjaxRequestCommand());
            this.debug(true, "switchAjaxResponseData", "command=" + response.command + " data=" + response.data);
        }

        if (response.command !== this.pendingAjaxRequestCommand()) {
            this.abend("switchAjaxResponseData", "commands not match: " + this.pendingAjaxRequestCommand() + ", " + response.command);
        }

        var data = JSON.parse(response.data);
        if (!data) {
            return;
        }

        if ((response.command !== "setup_link") &&
            (!this.phwangLinkObject().verifyLinkIdIndex(data.link_id))) {
            this.abend("switchAjaxResponseData", "link_id=" + data.link_id);
            return;
        }

        var func = this.switchTable()[response.command];
        if (func) {
            this.clearPendingAjaxRequestCommand();
            func.bind(this)(response.data);
            //this.resetKeepAliveTimer();
        }
        else {
            this.abend("switchAjaxResponseData", "bad command=" + response.command);
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

    this.setupLink = function (link_val) {
        var output = JSON.stringify({
                        command: "setup_link",
                        packet_id: this.ajaxPacketId(),
                        my_name: link_val.myName(),
                        password: link_val.passWord(),
                        });
        this.debug_(true, this.debugOutput(), "setupLink", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupLinkResponse = function (input_val) {
        this.debug(true, "setupLinkResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        this.phwangLinkObject().setLinkId(data.link_id);
        this.rootObject().receiveSetupLinkResponse();
    };


    this.getLinkData = function (link_val) {
        var output = JSON.stringify({
                        command: "get_link_data",
                        packet_id: this.ajaxPacketId(),
                        link_id: link_val.linkId(),
                        });
        this.debug_(false, this.debugOutput(), "getLinkData", "output=" + output);
        this.transmitAjaxRequest(output);
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
                var name_list_tag  = this.phwangObject().decodeNumber(data.c_data, 3);
                if (name_list_tag > this.phwangLinkObject().nameListTag()) {
                    this.getNameList(this.phwangLinkObject());
                }

                var c_data = data.c_data.slice(3);
            }

            if (data.c_pending_session_setup != "") {
                var data_session_id_index = data.c_pending_session_setup.slice(1, 9);
                var theme_name = data.c_pending_session_setup.slice(9, 11);
                var theme_config = data.c_pending_session_setup.slice(11);
                this.setupSessionReply(this, data.pending_session_setup, data_session_id_index);
            }

        }
    };

    this.getNameList = function (link_val) {
        var output = JSON.stringify({
                        command: "get_name_list",
                        packet_id: this.ajaxPacketId(),
                        link_id: link_val.linkId(),
                        name_list_tag: link_val.nameListTag(),
                        });
        this.debug_(true, this.debugOutput(), "getNameList", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getNameListResponse = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.c_name_list) {
                var name_list_tag  = this.phwangObject().decodeNumber(data.c_name_list, 3);
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

    this.setupSession = function (link_val, his_name_val, theme_data_val, play_color_val) {
        var output = JSON.stringify({
                        command: "setup_session",
                        packet_id: this.ajaxPacketId(),
                        link_id: link_val.linkId(),
                        his_name: his_name_val,
                        theme_data: theme_data_val,
                        play_color: play_color_val,
                        });
        this.debug_(true, this.debugOutput(), "setupSession", "output=" + output);
        this.transmitAjaxRequest(output);
    };

   this.setupSessionResponse = function (input_val) {
        this.debug(true, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.phwangSessionObject().setSessionId(data.session_id);
            this.debug(true, "setupSessionResponse", "sessionId=" + this.phwangSessionObject().sessionId());
            this.rootObject().receiveSetupSessionResponse();
        }
    };

    this.setupSessionReply = function (link_val, data_val, session_id_index_val) {
        var data = JSON.parse(data_val);
        var output = JSON.stringify({
                        command: "setup_session_reply",
                        packet_id: this.ajaxPacketId(),
                        my_name: link_val.myName(),
                        link_id: link_val.linkId(),
                        accept: "yes",
                        topic_data: data.topic_data,
                        session_id: session_id_index_val,
                        });
        this.debug_(true, this.debugOutput(), "setupSessionReply", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.phwangSessionStorageObject().setSessionId(data.session_id.slice(8));
            this.debug(true, "setupSessionReplyResponse", "sessionId=" + this.sessionStorageObject().sessionId());
            this.rootObject().receiveSetupSessionPeplyResponse();
        }
    };

    this.putSessionData = function (session_val, data_val) {
        this.checkPendingAjaxRequestCommand();

        var output = JSON.stringify({
                        command: "put_session_data",
                        packet_id: this.ajaxPacketId(),
                        link_id: session_val.phwangLinkObject().linkId(),
                        session_id: session_val.sessionId(),
                        xmt_seq: session_val.xmtSeq(),
                        data: data_val,
                        });
        session_val.incrementXmtSeq();
        this.debug_(false, this.debugOutput(), "putSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(false, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.phwangLinkObject().getSession(data.session_id);
            if (session) {
                this.getSessionData(session);
            }
        }
    };

    this.getSessionData = function (session_val) {
        var output = JSON.stringify({
                        command: "get_session_data",
                        packet_id: this.ajaxPacketId(),
                        link_id: session_val.phwangLinkObject().linkId(),
                        session_id: session_val.sessionId(),
                        });
        this.debug_(false, this.debugOutput(), "getSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getSessionDataResponse = function (json_data_val) {
        this.debug(false, "getSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.phwangLinkObject().getSession(data.session_id);
            if (session) {
                session.receiveData(data.c_data);
            }
        }
    };

    this.transmitAjaxRequest = function (output_val) {
        if (!this.noPendingAjaxRequestCommand()) {
            this.logit("============================transmitAjaxRequest", this.pendingAjaxRequestCommand());
            this.logit("============================transmitAjaxRequest", this.pendingAjaxRequestCommand());
            this.logit("============================transmitAjaxRequest", this.pendingAjaxRequestCommand());
            this.enqueueAjaxRequest(output_val);
            return;
        }

        this.transmitAjaxRequest_(output_val);
    };


    this.transmitAjaxRequest_ = function (output_val) {
        var output = JSON.parse(output_val);
        if (output.command !== this.getLinkDataCommand()) {
            this.debug(true, "transmitAjaxRequest_", "output=" + output_val);
        }
        this.setPendingAjaxRequestCommand(output.command);

        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("gorequest", output_val);
        this.httpGetRequest().setRequestHeader("GOPACKETID", this.ajaxPacketId());
        this.incrementAjaxPacketId();
        this.httpGetRequest().send(null);
    };

    this.enqueueAjaxRequest = function (output_val) {
        if (this.theAjaxRequestQueue) {
            this.abend("enqueueAjaxRequest", "queue full");
            return;
        }
        this.theAjaxRequestQueue = output_val;
    };

    this.dequeueAjaxRequest = function (output_val) {
        if (!this.theAjaxRequestQueue) {
            return 0;
        }
        var output = this.theAjaxRequestQueue;
        this.theAjaxRequestQueue = 0;
        return output;
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

    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_object_val);
}

