/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoPlayConfigObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.theRootObject = root_val;
    };
    
    this.decodeGoConfig = function() {
        var go_config_data = sessionStorage.getItem("go_config_data");
        console.log("GoPlayConfigObject.decodeGoConfig() go_config_data=" + go_config_data);

        if ((go_config_data === undefined) || (go_config_data === "")) {
            this.theBoardSize = 19;
            this.theHandicapPoint = 0;
            this.theKomiPoint = 0;
            return;
        }

        if (go_config_data.charAt(0) != 'G') {
            abend("GoPlayConfigObject.constructor() not G");
        }

        var index = 4;
        this.theBoardSize = (go_config_data.charAt(index++) - '0') * 10
        this.theBoardSize += go_config_data.charAt(index++) - '0';
        console.log("board_size=" + this.theBoardSize);

        this.theHandicapPoint = (go_config_data.charAt(index++) - '0') * 10
        this.theHandicapPoint += go_config_data.charAt(index++) - '0';
        console.log("handicap=" + this.theHandicapPoint);

        this.theKomiPoint = (go_config_data.charAt(index++) - '0') * 10
        this.theKomiPoint += go_config_data.charAt(index++) - '0';
        console.log("komi=" + this.theKomiPoint);

        this.theMyColor = go_config_data.charAt(index++) - '0';
        console.log("color=" + this.theMyColor);

        this.theHisName = go_config_data.slice(index);
        console.log("his_name=" + this.theHisName);
    };

    this.playBothSides = function() {return this.thePlayBothSides;};
    this.setPlayBothSides = function() {this.thePlayBothSides = (this.phwangLinkObject().myName() === this.hisName());};
    this.boardSize = function() {return this.theBoardSize;};
    this.setBoardSize = function(val) {this.theBoardSize = val;};
    this.myColor = function() {return this.theMyColor;};
    this.setMyColorConverted = function(val) {if (val === "black") {this.theMyColor = GO.BLACK_STONE();} else if (val === "white") {this.theMyColor = GO.WHITE_STONE();} else {this.abend("setMyColor", val);}};
    this.setMyColor = function(val) {this.theMyColor = val;};
    this.hisColor = function() {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function() {return this.theHisName;};
    this.setHisName = function(val) {return this.theHisName = val;};
    this.handicapPoint = function() {return this.theHandicapPoint;};
    this.setHandicapPoint = function(val) {this.theHandicapPoint = val;};
    this.komiPoint = function() {return this.theKomiPoint;};
    this.setKomiPoint = function(val) {this.theKomiPoint = val;};
    this.realKomiPoint = function() {if (!this.komiPoint()) {return 0;} return this.komiPoint() + 0.5;};
    this.isValidCoordinates = function(x_val, y_val) {return this.isValidCoordinate(x_val) && this.isValidCoordinate(y_val);};
    this.isValidCoordinate = function(coordinate_val) {return (0 <= coordinate_val) && (coordinate_val < this.boardSize());};
    this.objectName = function() {return "GoPlayConfigObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.configStorageObject = function() {return this.rootObject().configStorageObject();};
    this.phwangLinkObject = function() {return this.rootObject().phwangLinkObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}

function GoConfigStorageObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.debug(true, "init__", "myColor=" + this.myColor() + " boardSize=" + this.boardSize() + " hisName=" + this.hisName() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
    };
    this.storage = function() {return sessionStorage;};
    this.myColor = function() {return Number(this.storage().go_my_color);};
    this.setMyColor = function(val) {this.storage().go_my_color = val;};
    this.hisColor = function() {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function() {return this.storage().go_his_name;};
    this.setHisName = function(val) {this.storage().go_his_name = val;};
    this.boardSize = function() {return Number(this.storage().go_board_size);};
    this.setBoardSize = function(val) {this.storage().go_board_size = val;};
    this.handicapPoint = function() {return Number(this.storage().go_handicap_point);};
    this.setHandicapPoint = function(val) {this.storage().go_handicap_point = val;};
    this.komiPoint = function() {return Number(this.storage().go_komi_point);};
    this.setKomiPoint = function (val) {this.storage().go_komi_point = val;};
    this.goEncodedConfig = function() {return this.storage().go_encoded_config;};
    this.setGoEncodedConfig = function(val) {this.storage().go_encoded_config = val;};
    this.objectName = function() {return "GoConfigStorageObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}

var GO = new GoDefineObject;
function GoDefineObject() {
    this.EMPTY_STONE = function() {return 0;};
    this.BLACK_STONE = function() {return 1;};
    this.WHITE_STONE = function() {return 2;};
    this.BOTH_COLOR_STONE = function() {return 2;};
    this.MARK_DEAD_STONE_DIFF = function() {return 4;};
    this.MARK_EMPTY_STONE_DIFF = function() {return 6;};
    this.MARKED_DEAD_BLACK_STONE = function() {return this.BLACK_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_DEAD_WHITE_STONE = function() {return this.WHITE_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_EMPTY_BLACK_STONE = function() {return this.BLACK_STONE() + this.MARK_EMPTY_STONE_DIFF();};
    this.MARKED_EMPTY_WHITE_STONE = function() {return this.WHITE_STONE() + this.MARK_EMPTY_STONE_DIFF();};
}
