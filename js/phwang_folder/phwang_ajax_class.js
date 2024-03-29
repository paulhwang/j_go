/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxClass(phwang_object_val) {
    "use strict";
    this.init__ = function(phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.thePhwangAjaxProtocolObject = new PhwangAjaxProtocolClass();
        this.thePhwangAjaxStorageObject = new PhwangAjaxStorageObject(this);
        this.theTransmitQueueObject = new PhwangQueueClass(this.phwangObject());
        this.thePendingSessionDataQueueObject = new PhwangQueueClass(this.phwangObject());
        this.thePhwangAjaxEngineObject = new PhwangAjaxEngineClass(this);
        this.initSwitchTable();
        this.clearPendingAjaxRequestCommand();
        this.debug(false, "init__", "");
    };

    this.parseAndSwitchAjaxResponse = function(json_response_val) {
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

        if ((response.command !== this.phwangAjaxProtocolObject().SETUP_LINK_COMMAND()) &&
            (response.command !== this.phwangAjaxProtocolObject().SIGN_UP_COMMAND()) &&
            (response.command !== this.phwangAjaxProtocolObject().MMW_READ_DATA_COMMAND()) &&
            (!this.phwangLinkObject().verifyLinkIdIndex(data.link_id))) {
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

    this.initSwitchTable = function() {
        this.theSwitchTable = {
            "sign_up": this.signUpResponse,
            "setup_link": this.setupLinkResponse,
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session1": this.setupSession1Response,
            "setup_session2": this.setupSession2Response,
            "setup_session3": this.setupSession3Response,
            "get_session_data": this.getSessionDataResponse,
            "put_session_data": this.putSessionDataResponse,
            "mmw_read_data": this.mmwReadDataResponse,
        };
    };

    this.triggerGetMmwData = function() {
        this.debug(true, "triggerGetMmwData", "tbd");
        //var ajax_object = link_val.phwangAjaxObject();
        //ajax_object.getMmwData(link_val);
    };

    this.mmwReadDataRequest = function(act_val, filename_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().MMW_READ_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        act: act_val,
                        data: filename_val,
                        });
        this.debug(true, "mmwReadDataRequest", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.mmwReadDataResponse = function(json_response_val) {
        this.debug(true, "mmwReadDataResponse", "json_response_val=" + json_response_val);
        var response = JSON.parse(json_response_val);
        this.debug(true, "mmwReadDataResponse", "response.data=" + response.data);
        if (response.data === "I_data") {
            this.phwangPortObject().receiveMmwReadDataResponse(json_response_val);
        }
        else {
            this.getMmwDataResponse(json_response_val);
        }
    };

    this.triggerGetMmwData = function(link_val) {
        var ajax_object = link_val.phwangAjaxObject();
        ajax_object.getMmwData(link_val);
    };

    this.getMmwData = function(link_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().GET_MMW_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        name_list_tag: link_val.nameListTag(),
                        });
        this.debug(true, "getMmwData", "output=" + output);
        this.transmitAjaxRequest(output);
    };
    this.getMmwDataResponse = function(input_val) {
        this.debug(true, "getMmwDataResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.rootObject().displayObject().pushTarget(1000, 2000, 3000);
            this.rootObject().displayObject().drawBoard();

            if (data.mmw_data) {
                var target_data_x = data.mmw_data;
                var len = target_data_x.slice(0, 1);
                var x_str = target_data_x.slice(2, len)
                this.debug(true, "getMmwDataResponse", "len=" + len);
                this.debug(true, "getMmwDataResponse", "x_str=" + x_str);
                var x_number = this.phwangObject().decodeSignedNumber(x_str, Number(len) - 2);
                this.debug(true, "getMmwDataResponse", "x_number=" + x_number);

                var target_data_y = target_data_x.slice(Number(len) + 1);
                len = target_data_y.slice(0, 1);
                var y_str = target_data_y.slice(2, len)
                this.debug(true, "getMmwDataResponse", "len=" + len);
                this.debug(true, "getMmwDataResponse", "y_str=" + y_str);
                var y_number = this.phwangObject().decodeSignedNumber(y_str, Number(len) - 2);
                this.debug(true, "getMmwDataResponse", "y_number=" + y_number);

                var target_data_z = target_data_y.slice(Number(len) + 1);
                len = target_data_z.slice(0, 1);
                var z_str = target_data_z.slice(2, len)
                this.debug(true, "getMmwDataResponse", "len=" + len);
                this.debug(true, "getMmwDataResponse", "z_str=" + z_str);
                var z_number = this.phwangObject().decodeSignedNumber(z_str, Number(len) - 2);
                this.debug(true, "getMmwDataResponse", "z_number=" + z_number);

                this.rootObject().displayObject().pushTarget(x_number, y_number, z_number);
                this.rootObject().displayObject().drawBoard();

                this.triggerGetMmwData(this.phwangLinkObject());
            }
        }
    };

    this.signUpRequest = function(account_name_val, password_val, email_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SIGN_UP_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        my_name: account_name_val,
                        password: password_val,
                        email: email_val,
                        });
        this.debug(true, "signUpRequest", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.signUpResponse = function(input_val) {
        this.debug(true, "signUpResponse", "input_val=" + input_val);
        this.phwangPortObject().receiveSignUpResponse(input_val);
    };

    this.setupLinkRequest = function(link_val, password_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SETUP_LINK_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        my_name: link_val.myName(),
                        password: password_val,
                        });
        this.debug(true, "setupLinkRequest", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupLinkResponse = function(input_val) {
        this.debug(true, "setupLinkResponse", "input_val=" + input_val);
        this.phwangPortObject().receiveSetupLinkResponse(input_val);
    };

    this.getLinkData = function(link_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        });
        this.debug(false, "getLinkData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getLinkDataResponse = function(input_val) {
        this.debug(false, "getLinkDataResponse", "input_val=" + input_val);
        var input = JSON.parse(input_val);
        if (input) {
            if (input.data) {
                var data = input.data;
                while (data.length > 0) {
                    if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_NAME_LIST()) {
                        data = data.slice(1);
                        var name_list_tag  = this.phwangObject().decodeNumber(data, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE());
                        if (name_list_tag > this.phwangLinkObject().nameListTag()) {
                            this.phwangLinkObject().setServerNameListTag(name_list_tag);
                        }
                        data = data.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE());
                        continue;
                    }


                    if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION()) {
                        this.debug(true, "getLinkDataResponse", "pending_session_data=" + data);
                        var session_id = data.slice(1, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE() + 1);
                        this.debug(true, "getLinkDataResponse", "session_id=" + session_id);
                        data = data.slice(1 + this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE());
                        var theme_data = data;
                        this.debug(true, "getLinkDataResponse", "theme_data=" + theme_data);
                        var config_len = this.phwangObject().decodeNumber(theme_data.slice(1), 3);
                        var theme_data = theme_data.slice(0, config_len);
                        this.rootObject().configObject().decodeConfig(theme_data);
                        this.rootObject().configObject().putStorageConfigData();
                        data = data.slice(config_len);
                        this.setupSession2(this.phwangLinkObject(), theme_data, session_id);
                        continue;
                    }

                    if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION3()) {
                        this.debug(true, "getLinkDataResponse", "pending_session_data3=" + data);
                        var session_id = data.slice(1, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE() + 1);
                        this.debug(true, "getLinkDataResponse", "session_id=" + session_id);
                        data = data.slice(1 + this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE());
                        this.setupSession3(this.phwangLinkObject(), session_id);
                        continue;
                    }

                    if (data.charAt(0) === this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_DATA()) {
                        var link_session_id = data.slice(1, this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_LINK_SESSION_ID_SIZE() + 1);
                        this.debug(true, "getLinkDataResponse", "link_session_id=" + link_session_id);
                        this.pendingSessionDataQueueObject().enqueueData(link_session_id);
                        data = data.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_LINK_SESSION_ID_SIZE() + 1);
                        continue;
                    }

                    this.abend("getLinkDataResponse", "not supported command: " + data);
                    data = data.slice(data.length);
                }

                if (data.length !== 0) {
                    this.abend("getLinkDataResponse", "length=" + data.length);
                }
            }
        }
    };

    this.getNameList = function(link_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().GET_NAME_LIST_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        name_list_tag: link_val.nameListTag(),
                        });
        this.debug(true, "getNameList", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getNameListResponse = function(input_val) {
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

    this.setupSession1 = function(link_val, his_name_val, theme_data_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SETUP_SESSION1_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        his_name: his_name_val,
                        theme_data: theme_data_val,
                        });
        this.debug(true, "setupSession1", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSession1Response = function(input_val) {
        this.debug(true, "setupSession1Response", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.phwangSessionObject().setSessionId(data.session_id.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE()));
            this.phwangPortObject().receiveSetupSession1Response(data.result);
        }
    };

    this.setupSession2 = function(link_val, theme_data_val, session_id_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SETUP_SESSION2_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        accept: "yes",
                        session_id: session_id_val,
                        theme_data: theme_data_val,
                        });
        this.debug(true, "setupSession2", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSession2Response = function(json_data_val) {
        this.debug(true, "setupSession2Response", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.phwangSessionObject().setSessionId(data.session_id);
            this.debug(true, "setupSession2Response", "sessionId=" + this.phwangSessionObject().sessionId());
            this.phwangPortObject().receiveSetupSession2Response();
        }
    };

    this.setupSession3 = function(link_val, session_id_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().SETUP_SESSION3_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        session_id: session_id_val,
                        });
        this.debug(true, "setupSession3", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSession3Response = function(json_data_val) {
        this.debug(true, "setupSession3Response", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.phwangSessionObject().setSessionId(data.session_id);
            this.debug(true, "setupSession3Response", "sessionId=" + this.phwangSessionObject().sessionId());
            this.phwangPortObject().receiveSetupSession3Response();
        }
    };

    this.putSessionData = function(session_val, data_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().PUT_SESSION_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: session_val.phwangLinkObject().timeStamp(),
                        link_id: session_val.phwangLinkObject().linkId(),
                        session_id: session_val.sessionId(),
                        xmt_seq: session_val.xmtSeq(),
                        data: data_val,
                        });
        session_val.incrementXmtSeq();
        this.debug(true, "putSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.putSessionDataResponse = function(json_data_val) {
        this.debug(false, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
    };

    this.getSessionData = function(link_val, link_session_id_val) {
        var output = JSON.stringify({
                        command: this.phwangAjaxProtocolObject().GET_SESSION_DATA_COMMAND(),
                        packet_id: this.ajaxPacketId(),
                        time_stamp: link_val.timeStamp(),
                        link_id: link_val.linkId(),
                        session_id: link_session_id_val.slice(this.phwangAjaxProtocolObject().WEB_FABRIC_PROTOCOL_LINK_ID_SIZE()),
                        });
        this.debug(false, "getSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getSessionDataResponse = function(json_data_val) {
        this.debug(false, "getSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.phwangLinkObject().getSession(data.session_id);
            if (session) {
                session.receiveData(data.c_data);
            }
        }
    };

    this.transmitAjaxRequest = function(output_val) {
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

    this.startWatchDog = function(link_val) {
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
            var link_session_id = ajax_object.pendingSessionDataQueueObject().dequeueData();
            if (link_session_id) {
                ajax_object.getSessionData(link_val, link_session_id);
                return;
            }
            if (link_val.serverNameListTag() > link_val.nameListTag()) {
                ajax_object.getNameList(link_val);
                return;
            }
            ajax_object.getLinkData(link_val);
        }, 100, link_val);
    };

    this.pendingAjaxRequestCommand = function() {return this.thePendingAjaxRequestCommand;};
    this.pendingAjaxRequestCommandExist = function() {return (this.pendingAjaxRequestCommand() !== "");};
    this.clearPendingAjaxRequestCommand = function() {this.thePendingAjaxRequestCommand = "";};
    this.setPendingAjaxRequestCommand = function (command_val) {if (this.pendingAjaxRequestCommand()) {this.abend("setPendingAjaxRequestCommand", "old=" + this.pendingAjaxRequestCommand() + "new=" + command_val);} this.thePendingAjaxRequestCommand = command_val;};
    this.switchTable = function() {return this.theSwitchTable;}
    this.objectName = function() {return "PhwangAjaxClass";};
    this.phwangAjaxProtocolObject = function() {return this.thePhwangAjaxProtocolObject;};
    this.phwangAjaxStorageObject = function() {return this.thePhwangAjaxStorageObject;};
    this.phwangAjaxEngineObject = function() {return this.thePhwangAjaxEngineObject;};
    this.transmitQueueObject = function() {return this.theTransmitQueueObject;}
    this.pendingSessionDataQueueObject = function() {return this.thePendingSessionDataQueueObject;}
    this.phwangObject = function() {return this.thePhwangObject;};
    this.rootObject = function() {return this.phwangObject().rootObject();};
    this.phwangLinkObject = function() {return this.rootObject().phwangLinkObject();};
    this.phwangSessionObject = function() {return this.rootObject().phwangSessionObject();};
    this.phwangPortObject = function() {return this.phwangObject().phwangPortObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.ajaxPacketId = function() {return this.phwangAjaxStorageObject().ajaxPacketId();};
    this.incrementAjaxPacketId = function() {this.phwangAjaxStorageObject().incrementAjaxPacketId();};
    this.init__(phwang_object_val);
}

function PhwangAjaxEngineClass(phwang_ajax_object_val) {
    "use strict";
    this.ajaxRoute = function() {return "/django_go/go_ajax/";};
    this.jsonContext = function() {return "application/json; charset=utf-8";}
    this.plainTextContext = function() {return "text/plain; charset=utf-8";}
    this.init__ = function(phwang_ajax_object_val) {
        this.thePhwangAjaxObject = phwang_ajax_object_val;
        this.theHttpGetRequest = new XMLHttpRequest();
        this.startAjaxResponseProcess();
        this.debug(false, "init__", "");
    };

    this.startAjaxResponseProcess = function() {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.phwangAjaxObject().parseAndSwitchAjaxResponse(this0.httpGetRequest().responseText);
            }
        };
    };

    this.sendAjaxRequest = function(output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("phwangajaxrequest", output_val);
        this.httpGetRequest().setRequestHeader("phwangajaxpacketid", this.ajaxPacketId());
        this.incrementAjaxPacketId();
        this.httpGetRequest().send(null);
    };

    this.objectName = function() {return "PhwangAjaxEngineClass";};
    this.phwangAjaxObject = function() {return this.thePhwangAjaxObject;};
    this.httpGetRequest = function() {return this.theHttpGetRequest;};
    this.phwangAjaxStorageObject = function() {return this.phwangAjaxObject().phwangAjaxStorageObject();};
    this.phwangObject = function() {return this.phwangAjaxObject().phwangObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.ajaxPacketId = function() {return this.phwangAjaxObject().ajaxPacketId();};
    this.incrementAjaxPacketId = function() {this.phwangAjaxObject().incrementAjaxPacketId();};
    this.init__(phwang_ajax_object_val);
}

function PhwangAjaxStorageObject(phwang_ajax_object_val) {
    "use strict";
    this.storage = function() {return localStorage;};
    this.init__ = function (phwang_ajax_object_val) {
        this.thePhwangAjaxObject = phwang_ajax_object_val;
        this.resetAjaxStorage();
    };

    this.resetAjaxStorage = function() {
        this.resetAjaxPacketId();
    };

    this.resetAjaxPacketId = function() {if (this.ajaxPacketId() === undefined) {this.storage().ajax_packet_id = 0;}};
    this.ajaxPacketId = function() {return this.storage().ajax_packet_id;};
    this.incrementAjaxPacketId = function() {
        var i = Number(this.storage().ajax_packet_id) + 1;
        if (i !== 1 + Number(this.storage().ajax_packet_id)) {
            this.abend("incrementAjaxPacketId", "fix it");
        }
        this.storage().ajax_packet_id = i;
    };

    this.objectName = function() {return "PhwangAjaxStorageObject";};
    this.phwangAjaxObject = function() {return this.thePhwangAjaxObject;};
    this.phwangObject = function() {return this.phwangAjaxObject().phwangObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_ajax_object_val);
}

function PhwangAjaxProtocolClass() {
    "use strict";
    this.MMW_READ_DATA_COMMAND = function() {return "mmw_read_data";}
    this.SIGN_UP_COMMAND = function() {return "sign_up";}
    this.SETUP_LINK_COMMAND = function() {return "setup_link";}
    this.CLEAR_LINK_COMMAND = function() {return "clear_link";}
    this.GET_LINK_DATA_COMMAND = function() {return "get_link_data";}
    this.GET_NAME_LIST_COMMAND = function() {return "get_name_list";}
    this.SETUP_SESSION1_COMMAND = function() {return "setup_session1";}
    this.SETUP_SESSION2_COMMAND = function() {return "setup_session2";}
    this.SETUP_SESSION3_COMMAND = function() {return "setup_session3";}
    this.CLEAR_SESSION_COMMAND = function() {return "clear_session";}
    this.PUT_SESSION_DATA_COMMAND = function() {return "put_session_data";}
    this.GET_SESSION_DATA_COMMAND = function() {return "get_session_data";}
    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION = function() {return 'S';}
    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION3 = function() {return 'T';}
    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_DATA = function() {return 'D';}
    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_NAME_LIST = function() {return 'N';}
    this.WEB_FABRIC_PROTOCOL_NAME_LIST_TAG_SIZE = function() {return 3;}
    this.WEB_FABRIC_PROTOCOL_LINK_ID_SIZE = function() {return 8;}
    this.WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE = function() {return 8;}
    this.WEB_FABRIC_PROTOCOL_LINK_SESSION_ID_SIZE = function() {return this.WEB_FABRIC_PROTOCOL_LINK_ID_SIZE() + this.WEB_FABRIC_PROTOCOL_SESSION_ID_SIZE();}
}
