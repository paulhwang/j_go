/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoPlayConfigObject(root_val, config_val, encoded_config_val, his_name_val, my_color_val, initiater_val) {
    "use strict";

    this.init__ = function (root_val, encoded_config_val, initiater_val) {
        this.theRootObject = root_val;
        this.debug(true, "setupConfiguration", "encoded_config_val=" + encoded_config_val);
        this.debug(true, "setupConfiguration", "config=" + config_val);

        this.theEncodedConfig = encoded_config_val;
        this.decodeConfig();
        this.setHisName(his_name_val);
        this.setMyColor_(my_color_val);

        if (!initiater_val) {
            //this.setMyColor_(GO.getOppositeColor(this.myColor()));
        }
        this.debug(true, "init__", "size=" + this.boardSize() + " color=" + this.myColor() + " handicap=" + this.handicapPoint() + " komi=" + this.komiPoint());
    };

    this.configStorageObject = function () {
        return this.rootObject().configStorageObject();
    };

    this.sessionObject = function () {
        return this.rootObject().sessionObject();
    };

    this.gameObject = function () {
        return this.rootObject().gameObject();
    };

    this.myName = function () {
        return this.linkStorageObject().userName();
    };

    this.opponentName = function () {
        return this.sessionObject().hisName();
    };

    this.decodeConfig = function () {
        if (this.encodedConfig() === undefined) {
            this.setBoardSize(19);
            this.setHandicapPoint(0);
            this.setKomiPoint(0);
            return;
        }

        var data;
        var index = 2;
        data = (this.encodedConfig().charAt(index++) - '0') * 10
        data += this.encodedConfig().charAt(index++) - '0';
        this.setBoardSize(data);
        data = (this.encodedConfig().charAt(index++) - '0') * 10
        data += this.encodedConfig().charAt(index++) - '0';
        this.setHandicapPoint(data);
        data = (this.encodedConfig().charAt(index++) - '0') * 10
        data += this.encodedConfig().charAt(index++) - '0';
        this.setKomiPoint(data);
        this.logit("=============", this.boardSize());
        this.logit("=============", this.handicapPoint());
        this.logit("=============", this.komiPoint());
    };

    this.encodeConfig = function () {
        this.theEncodedConfig = "GO";
        if (this.boardSize() < 10)
            this.theEncodedConfig = this.theEncodedConfig + 0;
        this.theEncodedConfig = this.theEncodedConfig + this.boardSize();
        //this.theEncodedConfig = this.theEncodedConfig + this.stoneColor();
        if (this.handicapPoint() < 10)
            this.theEncodedConfig = this.theEncodedConfig + 0;
        this.theEncodedConfig = this.theEncodedConfig + this.handicapPoint();
        if (this.komiPoint() < 10)
            this.theEncodedConfig = this.theEncodedConfig + 0;
        this.theEncodedConfig = this.theEncodedConfig + this.komiPoint();
    };

    this.encodedConfig = function () {return this.theEncodedConfig;};
    this.hisName = function () {return this.theHisName;};
    this.setHisName = function (val) {this.theHisName = val;};
    this.boardSize = function () {return this.configStorageObject().boardSize();};
    this.setBoardSize = function (val) {this.theBoardSize = Number(val);};
    this.myColor = function () {return this.theMyColor;};
    this.hisColor = function () {if (this.theMyColor === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.setMyColor_ = function (val) {this.theMyColor = Number(val);};
    this.handicapPoint = function () {return this.configStorageObject().handicapPoint();};
    this.setHandicapPoint = function (val) {this.theHandicapPoint = Number(val);};
    this.komiPoint = function () {return this.configStorageObject().komiPoint();};
    this.setKomiPoint = function (val) {this.theKomiPoint = Number(val);};
    this.realKomiPoint = function () {if (!this.komiPoint()) {return 0;} return this.komiPoint() + 0.5;};
    this.isValidCoordinates = function (x_val, y_val) {return this.isValidCoordinate(x_val) && this.isValidCoordinate(y_val);};
    this.isValidCoordinate = function (coordinate_val) {return (0 <= coordinate_val) && (coordinate_val < this.boardSize());};
    this.objectName = function () {return "GoPlayConfigObject";};
    this.rootObject = function () {return this.theRootObject;};
    this.configStorageObject = function () {return this.rootObject().configStorageObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val, config_val, encoded_config_val, initiater_val);
}
