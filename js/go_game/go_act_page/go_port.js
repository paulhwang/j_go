/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: go_port.js
 */

function GoPlayPortObject(root_val) {
    "use strict";
    this.GO_PROTOCOL_CODE_SIZE = 7;
    this.GO_PROTOCOL_CODE_PROPOSE = "Propose";
    this.GO_PROTOCOL_CODE_ACCEPT = "Accept ";
    this.GO_PROTOCOL_CODE_CONFIRM = "Confirm";
    this.GO_PROTOCOL_CODE_MOVE_DATA = "Move   ";
    this.GO_PROTOCOL_CODE_SPECIAL_MOVE = "Special";
    this.GO_PROTOCOL_CODE_BOARD_DATA = "Board  ";

    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayPortObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.ajxObject = function () {
        return this.rootObject().ajxObject();
    };

    this.configObject = function () {
        return this.rootObject().configObject();
    };

    this.gameObject = function () {
        return this.rootObject().gameObject();
    };

    this.phwangSessionObject = function () {
        return this.rootObject().phwangSessionObject();
    };

    this.boardObject = function () {
        return this.rootObject().boardObject();
    };

    this.displayObject = function () {
        return this.rootObject().displayObject();
    };

    this.transmitMoveData = function (move_val) {
        var data = this.GO_PROTOCOL_CODE_MOVE_DATA + move_val.encodeMove();
        this.transmitData(data);
    };

    this.transmitSpecialMoveData = function (special_val) {
        var data = this.GO_PROTOCOL_CODE_SPECIAL_MOVE + special_val;
        this.transmitData(data);
    };

    this.transmitData = function (data_val) {
        this.debug(true, "transmitData", "data_val=" + data_val);
        this.phwangSessionObject().transmitData(data_val);
    };

    this.receiveData = function (c_data_val) {
        this.debug(true, "receiveData", "c_data_val=" + c_data_val);
        this.boardObject().decodeBoard(c_data_val);
        this.displayObject().drawBoard();
        return;
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

    this.init__(root_val);
}

