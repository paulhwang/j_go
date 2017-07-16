/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoConfigStorageObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "size=" + this.boardSize() + " color=" + this.myColor() + " handicap=" + this.handicapPoint() + " komi=" + this.komiPoint());
    };


    this.configInputData = function () {
        return this.storage().config_input_data;
    };

    this.setConfigInputData = function (val) {
        this.storage().config_input_data = val;
    };

    this.storage = function () {return localStorage;};
    this.myColor = function () {return this.storage().go_my_color;};
    this.setMyColor = function (val) {if (val === "black") {this.storage().go_my_color = GO.BLACK_STONE();} else if (val === "white") {this.storage().go_my_color = GO.WHITE_STONE();} else {this.abend("setMyColor", val);}};
    this.hisName = function () {return this.storage().go_his_name;};
    this.setHisName = function (val) {this.storage().go_his_name = val;};


    this.boardSize = function () {return Number(this.storage().go_board_size);};
    this.setBoardSize = function (val) {this.storage().go_board_size = Number(val);};
    this.handicapPoint = function () {return Number(this.storage().go_handicap_point);};
    this.setHandicapPoint = function (val) {this.storage().go_handicap_point = Number(val);};
    this.komiPoint = function () {return Number(this.storage().go_komi_point);};
    this.setKomiPoint = function (val) {this.storage().go_komi_point = Number(val);};




    this.goEncodedConfig = function () {return this.storage().go_encoded_config;};
    this.setGoEncodedConfig = function (val) {this.storage().go_encoded_config = val;};
    this.objectName = function () {return "GoConfigStorageObject";};
    this.rootObject = function () {return this.theRootObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}
