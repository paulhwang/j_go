/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangLinkStorageObject(phwang_object_val) {
    "use strict";

    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.theStorage = localStorage;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "PhwangLinkStorageObject";
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
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
        return this.storage().link_id;
    };

    this.setLinkId = function (val) {
        this.storage().link_id = val;
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
        this.setLinkId("");
        this.setUserName("");
        this.setPassWord("");
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
