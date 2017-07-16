/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoConfigStorageObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {this.theRootObject = root_val;};


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

    this.storage = function () {return localStorage;};
    this.myColor = function () {return this.storage().go_my_color;};
    this.setMyColor = function (val) {if (val === "black") {this.storage().go_my_color = GO.BLACK_STONE();} else if (val === "white") {this.storage().go_my_color = GO.WHITE_STONE();} else {this.abend("setMyColor", val);}};
    this.hisName = function () {return this.storage().go_his_name;};
    this.setHisName = function (val) {this.storage().go_his_name = val;};
    this.goEncodedConfig = function () {return this.storage().go_encoded_config;};
    this.setGoEncodedConfig = function (val) {this.storage().go_encoded_config = val;};
    this.rootObject = function () {return this.theRootObject;};
    this.init__(root_val);
}

