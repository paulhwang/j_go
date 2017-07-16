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
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.hisName = function () {return this.storage().go_his_name;};
    this.setHisName = function (val) {this.storage().go_his_name = val;};

    this.goEncodedConfig = function () {
        return this.storage().go_encoded_config;
    };

    this.setGoEncodedConfig = function (val) {
        this.storage().go_encoded_config = val;
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

    this.init__(root_val);
}

