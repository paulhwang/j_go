/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxClass(phwang_object_val) {
    "use strict";

    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.thePhwangAjaxProtocolObject = new PhwangAjaxProtocolClass();
        this.thePhwangAjaxStorageObject = new PhwangAjaxStorageObject(this);
        this.theTransmitQueueObject = new PhwangQueueClass(this.phwangObject());
        this.thePhwangAjaxEngineObject = new PhwangAjaxEngineClass(this);
        this.initSwitchTable();
        this.thePendingAjaxRequestCommand = "";
        this.debug(false, "init__", "");
    };

    this.parseAndSwitchAjaxResponse = function (json_response_val) {
        var response = JSON.parse(json_response_val);

        if (response.command !== this.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND()) {
            this.debug(true, "parseAndSwitchAjaxResponse", "command=" + response.command + " data=" + response.data);
        }

        if (response.command !== this.pendingAjaxRequestCommand()) {
            this.abend("parseAndSwitchAjaxResponse", "commands not match: " + this.pendingAjaxRequestCommand() + ", " + response.command);
            return;
        }

        var data = JSON.parse(response.data);
        if (!data) {
            return;
        }

        if ((response.command !== this.phwangAjaxProtocolObject().SETUP_LINK_COMMAND()) && (!this.phwangLinkObject().verifyLinkIdIndex(data.link_id))) {
            this.abend("parseAndSwitchAjaxResponse", "link_id=" + data.link_id);
            return;
        }

        var func = this.switchTable()[response.command];
        if (!func) {
            this.abend("parseAndSwitchAjaxResponse", "bad command=" + response.command);
            return;
        }

        this.clearPendingAjaxRequestCommand();
        func.bind(this)(response.data);
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
                        command: this.phwangAjaxProtocolObject().SETUP_LINK_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        my_name: link_val.myName(),
                        password: link_val.passWord(),
                        });
        this.debug(true, "setupLink", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupLinkResponse = function (input_val) {
        this.debug(true, "setupLinkResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        this.phwangLinkObject().setLinkId(data.link_id);
        this.phwangPortObject().receiveSetupLinkResponse();
    };

    this.getLinkData = function (link_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        link_id: link_val.linkId(),
                        });
        this.debug(false, "getLinkData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getLinkDataResponse = function (input_val) {
        this.debug(false, "getLinkDataResponse", "input_val=" + input_val);
        var input = JSON.parse(input_val);
        if (input) {
            if (input.pending_session_data) {
                this.debug(true, "getLinkDataResponse", "pending_session_data=" + input.pending_session_data);
                var i = 0;
                while (i >= 0) {
                    var session_id = input.pending_session_data[i];
                    var session = this.sessionMgrObject().searchSessionBySessionId(session_id);
                    if (session) {
                        this.tAjaxObject().getSessionData(session);
                    }
                    i -= 1;
                }
            }

            if (input.pending_session_setup != "") {
                var data_session_id_index = input.pending_session_setup.slice(1, 9);
                var theme_name = input.pending_session_setup.slice(9, 11);
                var theme_config = input.pending_session_setup.slice(11);
                this.setupSessionReply(this, input.pending_session_setup, data_session_id_index);
            }

            if (input.data) {
                var name_list_tag  = this.phwangObject().decodeNumber(input.data, 3);
                if (name_list_tag > this.phwangLinkObject().nameListTag()) {
                    this.phwangLinkObject().setServerNameListTag(name_list_tag);
                }
                var data = input.data.slice(3);
            }
        }
    };

    this.getNameList = function (link_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().GET_NAME_LIST_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        link_id: link_val.linkId(),
                        name_list_tag: link_val.nameListTag(),
                        });
        this.debug(true, "getNameList", "output=" + output);
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
                this.phwangPortObject().receiveGetNameListResponse();
            }
        }
    };

    this.setupSession = function (link_val, his_name_val, theme_data_val, play_color_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SETUP_SESSION_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        link_id: link_val.linkId(),
                        his_name: his_name_val,
                        theme_data: theme_data_val,
                        play_color: play_color_val,
                        });
        this.debug(true, "setupSession", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSessionResponse = function (input_val) {
        this.debug(true, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.phwangSessionObject().setSessionId(data.session_id);
            this.debug(true, "setupSessionResponse", "sessionId=" + this.phwangSessionObject().sessionId());
            this.phwangPortObject().receiveSetupSessionResponse();
        }
    };

    this.setupSessionReply = function (link_val, data_val, session_id_index_val) {
        var data = JSON.parse(data_val);
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SETUP_SESSION_REPLY_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        my_name: link_val.myName(),
                        link_id: link_val.linkId(),
                        accept: "yes",
                        topic_data: data.topic_data,
                        session_id: session_id_index_val,
                        });
        this.debug(true, "setupSessionReply", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.phwangSessionStorageObject().setSessionId(data.session_id.slice(8));
            this.debug(true, "setupSessionReplyResponse", "sessionId=" + this.sessionStorageObject().sessionId());
            this.phwangPortObject().receiveSetupSessionPeplyResponse();
        }
    };

    this.putSessionData = function (session_val, data_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().PUT_SESSION_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        link_id: session_val.phwangLinkObject().linkId(),
                        session_id: session_val.sessionId(),
                        xmt_seq: session_val.xmtSeq(),
                        data: data_val,
                        });
        session_val.incrementXmtSeq();
        this.debug(false, "putSessionData", "output=" + output);
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
                        command: this.phwangAjaxProtocolObject().GET_SESSION_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        link_id: session_val.phwangLinkObject().linkId(),
                        session_id: session_val.sessionId(),
                        });
        this.debug(false, "getSessionData", "output=" + output);
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
        if (this.pendingAjaxRequestCommandExist()) {
            this.transmitQueueObject().enqueueData(output_val);
            return;
        }
        this.xmtAjaxRequest(output_val);
    };

    this.xmtAjaxRequest = function (output_val) {
        var output = JSON.parse(output_val);
        if (output.command !== this.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND()) {
            this.debug(true, "xmtAjaxRequest", "output=" + output_val);
        }
        this.setPendingAjaxRequestCommand(output.command);
        this.phwangAjaxEngineObject().sendAjaxRequest(output_val);
    };

    this.startWatchDog = function (link_val) {
        setInterval(function (link_val) {
            var ajax_object = link_val.phwangAjaxObject();
            if (ajax_object.pendingAjaxRequestCommandExist()) {
                if (ajax_object.pendingAjaxRequestCommand() !== ajax_object.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND()) {
                    link_val.debug(false, "PhwangAjaxClassWatchDog", ajax_object.pendingAjaxRequestCommand() + " is pending");
                }
                return;
            }

            var output = ajax_object.transmitQueueObject().dequeueData();
            if (output) {
                ajax_object.xmtAjaxRequest(output);
                return;
            }

            if (link_val.serverNameListTag() > link_val.nameListTag()) {
                ajax_object.getNameList(link_val);
                return;
            }

            ajax_object.getLinkData(link_val);
        }, 100, link_val);
    };

    this.pendingAjaxRequestCommand = function () {return this.thePendingAjaxRequestCommand;};
    this.pendingAjaxRequestCommandExist = function () {return (this.pendingAjaxRequestCommand() !== "");};
    this.clearPendingAjaxRequestCommand = function () {this.thePendingAjaxRequestCommand = "";};
    this.setPendingAjaxRequestCommand = function (command_val) {if (this.pendingAjaxRequestCommand()) {this.abend("setPendingAjaxRequestCommand", "old=" + this.pendingAjaxRequestCommand() + "new=" + command_val);} this.thePendingAjaxRequestCommand = command_val;};
    this.switchTable = function () {return this.theSwitchTable;}
    this.objectName = function () {return "PhwangAjaxClass";};
    this.phwangAjaxProtocolObject = function () {return this.thePhwangAjaxProtocolObject;};
    this.phwangAjaxStorageObject = function () {return this.thePhwangAjaxStorageObject;};
    this.phwangAjaxEngineObject = function () {return this.thePhwangAjaxEngineObject;};
    this.transmitQueueObject = function () {return this.theTransmitQueueObject;}
    this.phwangObject = function () {return this.thePhwangObject;};
    this.rootObject = function () {return this.phwangObject().rootObject();};
    this.phwangLinkObject = function () {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function () {return this.rootObject().phwangSessionObject();};
    this.phwangPortObject = function () {return this.phwangObject().phwangPortObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.ajaxPacketId = function () {return this.phwangAjaxStorageObject().ajaxPacketId();};
    this.incrementAjaxPacketId = function () {this.phwangAjaxStorageObject().incrementAjaxPacketId();};
    this.init__(phwang_object_val);
}
