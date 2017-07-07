/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LinkStorageObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "LinkStorageObject";
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.userName = function () {
        return this.storage().user_name;
    };

    this.setUserName = function (val) {
        this.storage().user_name = val;
    };

    this.passWord = function () {
        return this.thePassWord;
    };

    this.setPassWord = function (val) {
        this.thePassWord = val;
    };

    this.linkId = function () {
        return Number(this.storage().link_id);
    };

    this.setLinkId = function (val) {
        this.storage().link_id = val;
    };

    this.linkIdIndex = function () {
        return this.storage().link_id_index;
    };

    this.setLinkIdIndex = function (val) {
        this.storage().link_id_index = val;
    };

    this.serverIp = function () {
        return this.storage().server_ip;
    };

    this.setServerIp = function (val) {
        this.storage().server_ip = val;
    };

    this.serverPort = function () {
        return this.storage().server_port;
    };

    this.setServerPort = function (val) {
        this.storage().server_port = val;
    };

    this.serverIpPort = function () {
        return this.serverIp() + ":" + this.serverPort();
    };

    this.serverHttpHeader = function () {
        return "http://" + this.serverIpPort() + "/";
    };

    this.serverHttpsHeader = function () {
        return "https://" + this.serverIpPort() + "/";
    };

    this.setHttpInfo = function () {
        this.setServerIp(window.location.hostname);
        this.setServerPort(window.location.port);
    };

    this.resetLinkStorage = function () {
        this.setLinkId(0);
        this.setLinkIdIndex("");
        this.setUserName("");
        this.setPassWord("");
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

    this.init__();
}
