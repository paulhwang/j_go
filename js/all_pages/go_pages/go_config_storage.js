/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoConfigStorageObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "boardSize=" + this.boardSize() + " myColor=" + this.myColor() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
    };


    this.configInputData = function () {
        return this.storage().config_input_data;
    };

    this.setConfigInputData = function (val) {
        this.storage().config_input_data = val;
    };

    this.decodeConfig = function (encoded_val) {
        if ((encoded_val === undefined) || (encoded_val === "")) {
            this.setBoardSize(19);
            this.setHandicapPoint(0);
            this.setKomiPoint(0);
            return;
        }

        var data;
        var index = 0;//////////////////
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setBoardSize(data);
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setHandicapPoint(data);
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setKomiPoint(data);
        data = encoded_val.charAt(index++) - '0';
        this.setMyColor_(data);
        this.logit("=============", this.boardSize());
        this.logit("=============", this.handicapPoint());
        this.logit("=============", this.komiPoint());
        this.logit("=============", this.myColor());
    };

    this.encodeConfig = function () {
        var buf = "GO";
        if (this.boardSize() < 10) buf = buf + 0; buf = buf + this.boardSize();
        if (this.handicapPoint() < 10) buf = buf + 0; buf = buf + this.handicapPoint();
        if (this.komiPoint() < 10) buf = buf + 0; buf = buf + this.komiPoint();
        buf = buf + this.hisColor();
        return buf;
    };

    this.storage = function () {return localStorage;};
    this.myColor = function () {return Number(this.storage().go_my_color);};
    this.setMyColor = function (val) {if (val === "black") {this.storage().go_my_color = GO.BLACK_STONE();} else if (val === "white") {this.storage().go_my_color = GO.WHITE_STONE();} else {this.abend("setMyColor", val);}};
    this.setMyColor_ = function (val) {this.storage().go_my_color = val;};
    this.hisColor = function () {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function () {return this.storage().go_his_name;};
    this.setHisName = function (val) {this.storage().go_his_name = val;};
    this.boardSize = function () {return Number(this.storage().go_board_size);};
    this.setBoardSize = function (val) {this.storage().go_board_size = val;};
    this.handicapPoint = function () {return Number(this.storage().go_handicap_point);};
    this.setHandicapPoint = function (val) {this.storage().go_handicap_point = val;};
    this.komiPoint = function () {return Number(this.storage().go_komi_point);};
    this.setKomiPoint = function (val) {this.storage().go_komi_point = val;};
    this.goEncodedConfig = function () {return this.storage().go_encoded_config;};
    this.setGoEncodedConfig = function (val) {this.storage().go_encoded_config = val;};
    this.objectName = function () {return "GoConfigStorageObject";};
    this.rootObject = function () {return this.theRootObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}
