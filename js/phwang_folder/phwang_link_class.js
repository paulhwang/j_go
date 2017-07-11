/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function PhwangLinkClass(phwang_object_val) {
    "use strict";

    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.thePhwangLinkStorageObject = new PhwangLinkStorageObject(this);
        this.theNameList = [];
        this.theNameListTag = 0;
        this.theSessionIndexArray = [0];
        this.theSessionTableArray = [null];
        //this.phwangAjaxObject().getLinkData(this);
        this.debug(true, "init__", "linkId=" + this.linkId() + " myName=" + this.myName());
    };

    this.hisName = function () {//////////////////////
        return "PhwangLinkClass";
    };

    this.gameName = function () {///////////////////////////
        return "Go";
    };

    this.objectName = function () {
        return "PhwangLinkClass";
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.phwangLinkStorageObject = function () {
        return this.thePhwangLinkStorageObject;
    };

    this.rootObject = function () {
        return this.phwangObject().rootObject();
    };

    this.phwangAjaxObject = function () {
        return this.phwangObject().phwangAjaxObject();
    };

    this.phwangSessionObject = function () {
        return this.phwangObject().phwangSessionObject();
    };

    this.htmlObject = function () {
        return this.rootObject().htmlObject();
    };

    this.myName = function () {
        return this.phwangLinkStorageObject().myName();
    };

    this.setMyName = function (val) {
        this.phwangLinkStorageObject().setMyName(val);
    };

    this.passWord = function () {
        return this.phwangLinkStorageObject().passWord();
    };

    this.setPassWord = function (val) {
        this.phwangLinkStorageObject().setPassWord(val);
    };

    this.linkId = function () {
        return this.phwangLinkStorageObject().linkId();
    };

    this.setLinkId = function (val) {
        if (this.linkId()) {
            //this.abend("setLinkIdIndex", "already exist");
        }
        this.phwangLinkStorageObject().setLinkId(val);
    };

    this.sessionIndexArray = function () {
        return this.theSessionIndexArray;
    };

    this.sessionTableArray = function () {
        return this.theSessionTableArray;
    };

    this.sessionTableArrayLength = function () {
        return this.sessionTableArray().length;
    };

    this.sessionTableArrayElement = function (val) {
        return this.sessionTableArray()[val];
    };

    this.verifyLinkIdIndex = function (id_val) {
        if (this.linkId() === id_val) {
            return true;
        } else {
            return false;
        }
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

    this.nameListTag = function () {
        return this.theNameListTag;
    };

    this.setNameListTag = function (val) {
        this.theNameListTag = val;
    };

    this.nameList = function () {
        return this.theNameList;
    };

    this.setNameList = function (data_val) {
        this.theNameList = data_val;
    };

    this.nameListLength = function () {
        return this.nameList().length;
    };

    this.nameListElement = function (index_val) {
        return this.nameList()[index_val];
    };

    this.setNameListElement = function (index_val, data_val) {
        this.nameList()[index_val] = data_val;
    };

    this.resetLinkStorage = function () {
        this.phwangLinkStorageObject().resetLinkStorage();
    };

    this.setHttpInfo = function () {
        this.phwangLinkStorageObject().setHttpInfo();
    };

    this.serverHttpHeader = function () {
        return this.phwangLinkStorageObject().serverHttpHeader();
    };

    this.serverHttpsHeader = function () {
        return this.phwangLinkStorageObject().serverHttpsHeader();
    };

    this.mallocSessionAndInsert = function (session_id_val) {
        this.phwangSessionObject().setSessionId(session_id_val);
        var session = new PhwangSessionClass(this);
        if (!session) {
            return null;
        }
        return session;
    };

    this.insertSession = function (session_val) {
        this.sessionIndexArray().push(session_val.sessionId());
        this.sessionTableArray().push(session_val);
    };

    this.getSession = function (session_id_val) {
        var index = this.sessionIndexArray().indexOf(session_id_val);
        if (index === -1) {
            return null;
        } else {
            var session =this.sessionTableArray()[index];
            return session;
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
            this0.ajaxObject().setupSession(this0, topic_data, his_name);
        });
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

