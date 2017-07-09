/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function RAjaxObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.initSwitchTable();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "RAjaxObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.phwangAjaxObject = function () {
        return this.rootObject().phwangAjaxObject();
    };

    this.phwangLinkObject = function () {
        return this.rootObject().phwangLinkObject();
    };

    this.switchTable = function () {
        return this.theSwitchTable;
    }

    this.phwangSessionStorageObject = function () {
        return this.rootObject().phwangSessionStorageObject();
    };

    this.linkUpdateInterval = function () {
        return this.theLinkUpdateInterval;
    };

    this.setLinkUpdateInterval = function (val) {
        this.theLinkUpdateInterval = val;
    };

    this.initSwitchTable = function () {
        this.theSwitchTable = {
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session": this.setupSessionResponse,
            "setup_session_reply": this.setupSessionReplyResponse,
            "get_session_data": this.getSessionDataResponse,
            "put_session_data": this.putSessionDataResponse,
        };
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
                    this.phwangAjaxObject().getNameList(this.phwangLinkObject());
                }
                c_data = c_data.slice(3);
            }

            if (data.c_pending_session_setup != "") {
                var data_session_id_index = data.c_pending_session_setup.slice(1, 9);
                var theme_name = data.c_pending_session_setup.slice(9, 11);
                var theme_config = data.c_pending_session_setup.slice(11);
                this.phwangAjaxObject().setupSessionReply(this, data.pending_session_setup, data_session_id_index);
            }

        }

        setTimeout(function(link_val) {
            link_val.debug(false, "getLinkDataResponse:timer", "setTimeout");
            link_val.phwangAjaxObject().getLinkData(link_val);
        }, this.linkUpdateInterval(), this.phwangLinkObject());
    };

    this.getNameListResponse___ = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.name_list) {
                this.setNameList(data.name_list);
                if (this.myName() !== "z") {
                    this.getConfigAndSetupSession();
                }
            }
        }
    };

    this.getNameListResponse = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.name_list) {
                //this.setNameList(data.name_list);
                //this.rootObject().htmlObject().renderNameList();////////////////////////////
            }
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

    this.getConfigAndSetupSession = function () {
        var this0 = this;
        var title = "go";
        var size;
        var color;
        var komi;
        var handicap;
        var his_name = "a";

        this.htmlObject().goConfigHtmlObject().createSessionHolders(this);

        $(".peer_game_paragraph button").on("click", function() {
            title = $(".peer_game_paragraph select").val();
            this0.debug(true, "getConfigAndSetupSession", title);
        });

        $(".peer_connect_section button").on("click", function() {
            his_name = $(".peer_name_paragraph select").val();
            size = $(".board_size_section select").val();
            color = $(".play_color_section select").val();
            komi = $(".komi_section select").val();
            handicap = $(".handicap_section select").val();
            this0.debug(false, "getConfigAndSetupSession", " my_name=" + this0.myName() +
                                            " his_name=" + his_name +
                                            " board_size=" + size +
                                            " color=" + color +
                                            " komi=" + komi +
                                            " handicap=" + handicap);
            var config = JSON.stringify({
                            board_size: size,
                            color: color,
                            komi: komi,
                            handicap: handicap,
                            });
            var topic_data = JSON.stringify({
                            title: title,
                            config: config,
                            });
            this0.phwangAjaxObject().setupSession(this0, topic_data, his_name);
        });
    };

    this.setupSessionResponse___ = function (input_val) {
        this.debug(false, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var session = this.mallocSessionAndInsert(data.session_id);
            if (data.topic_data) {
                session.appendTopicToSession(data.topic_data, data.his_name, true);
            }
        }
    };

    this.setupSessionResponse = function (input_val) {
        this.debug(true, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.phwangSessionStorageObject().setSessionId(data.session_id);
            this.phwangSessionStorageObject().setSessionIdIndex(data.session_id_index);
            this.debug(true, "setupSessionResponse", "sessionIdIndex=" + this.phwangSessionStorageObject().sessionIdIndex());
            window.open(this.rootObject().nextPage(), "_self")
        }
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.sessionStorageObject().setSessionId(data.session_id);
            this.sessionStorageObject().setSessionIdIndex(data.session_id_index.slice(8));
            this.debug(true, "setupSessionReplyResponse", "sessionIdIndex=" + this.sessionStorageObject().sessionIdIndex());
            window.open(this.rootObject().nextPage(), "_self")
            //var session = this.mallocSessionAndInsert(data.session_id);
            //if (data.topic_data) {
            //    session.appendTopicToSession(data.topic_data, data.his_name, false);
            //}
        }
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(true, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.phwangLinkObject().getSession(data.session_id_index);
            if (session) {
                if (data.c_data === "job is done") {
                    //this.ajaxObject().getSessionData(session);
                }
                //session.receiveData(data.res_data, data.c_data);
                this.phwangAjaxObject().getSessionData(session);
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

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(root_object_val);
}

