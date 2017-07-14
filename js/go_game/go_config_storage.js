/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoConfigStorageObject(root_val) {
    "use strict";

    this.storage = function () {
        return localStorage;
    };

    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoConfigStorageObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.phwangObject = function () {
        return this.rootObject().phwangObject();
    };

    this.configInputData = function () {
        return this.storage().config_input_data;
    };

    this.setConfigInputData = function (val) {
        this.storage().config_input_data = val;
    };

    this.boardSize = function () {
        return Number(this.storage().board_size);
    };

    this.stoneColor = function () {
        return this.storage().stone_color;
    };

    this.komi = function () {
        return this.storage().komi;
    };

    this.handicap = function () {
        return this.storage().handicap;
    };

    this.setBoardSize = function (val) {
        this.storage().board_size = val;
    };

    this.setStoneColor = function (val) {
        this.storage().stone_color = val;
    };

    this.setKomi = function (val) {
        this.storage().komi = val;
    };

    this.setHandicap = function (val) {
        this.storage().handicap = val;
    };

    this.configInJson = function () {
        return JSON.stringify({
                            board_size: this.boardSize(),
                            color: this.stoneColor(),
                            komi: this.komi(),
                            handicap: this.handicap(),
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

    this.init__(root_val);
}

