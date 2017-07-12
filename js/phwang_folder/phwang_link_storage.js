/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangLinkStorageObject(phwang_link_object_val) {
    "use strict";
    this.storage = function () {return localStorage;};
    this.init__ = function (phwang_link_object_val) {this.thePhwangLinkObject = phwang_link_object_val;};

    this.resetLinkStorage = function () {
        this.resetLinkId();
        this.resetMyName();
        this.resetPassWord();
    };

    this.myName = function () {return this.storage().my_name;};
    this.setMyName = function (val) {this.storage().my_name = val;};
    this.resetMyName = function () {this.setMyName("");};
    this.passWord = function () {return this.thePassWord;};
    this.setPassWord = function (val) {this.thePassWord = val;};
    this.resetPassWord = function () {this.setPassWord("");};
    this.linkId = function () {return this.storage().link_id;};
    this.setLinkId = function (val) {this.storage().link_id = val;};
    this.resetLinkId = function () {this.setLinkId("");};

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

    this.objectName = function () {return "PhwangLinkStorageObject";};
    this.phwangLinkObject = function () {return this.thePhwangLinkObject;};
    this.phwangObject = function () {return this.phwangLinkObject().phwangObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_link_object_val);
}
