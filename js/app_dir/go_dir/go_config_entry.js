/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoConfigObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.theRootObject = root_val;
    };
    
    this.decode = function() {
        var go_config_data = sessionStorage.getItem("theme_data");
        console.log("GoConfigObject.decode() go_config_data=" + go_config_data);

        if ((go_config_data === undefined) || (go_config_data === "")) {
            this.theBoardSize = 19;
            this.theHandicapPoint = 0;
            this.theKomiPoint = 0;
            return;
        }

        if (go_config_data.charAt(0) != 'G') {
            console.log("GoConfigObject.decode() not G");
            abend();
        }

        var index = 3;
        this.theBoardSize = (go_config_data.charAt(index++) - '0') * 10
        this.theBoardSize += go_config_data.charAt(index++) - '0';

        this.theHandicapPoint = (go_config_data.charAt(index++) - '0') * 10
        this.theHandicapPoint += go_config_data.charAt(index++) - '0';

        this.theKomiPoint = (go_config_data.charAt(index++) - '0') * 10
        this.theKomiPoint += go_config_data.charAt(index++) - '0';

        this.theInitiatorColor = go_config_data.charAt(index++) - '0';

        this.theInitiatorName = go_config_data.slice(index);
        console.log("initiator_name=" + this.theInitiatorName);

        if (sessionStorage.my_name === this.theInitiatorName) {
            this.theMyColor = this.theInitiatorColor;
        }
        else {
            if (this.theInitiatorColor === GO.BLACK_STONE) {
                this.theMyColor = GO.WHITE_STONE;
            }
            else {
                this.theMyColor = GO.BLACK_STONE;
            }
        }
        console.log("theMyColor=" + this.theMyColor);
    };

    this.printConfigInfo = function() {
        console.log("GoConfigObject.decode() board_size=" + this.boardSize());
        console.log("GoConfigObject.decode() handicap=" + this.handicapPoint());
        console.log("GoConfigObject.decode() komi=" + this.komiPoint());
        console.log("GoConfigObject.decode() initiator_color=" + this.initiatorColor());
    }

    this.boardSize = () => this.theBoardSize;
    this.handicapPoint = () => this.theHandicapPoint;
    this.komiPoint = () => this.theKomiPoint;
    this.initiatorColor = () => this.theInitiatorColor;

    this.playBothSides = function() {return this.thePlayBothSides;};
    this.setPlayBothSides = function() {this.thePlayBothSides = (this.phwangLinkObject().myName() === this.hisName());};
    this.setBoardSize = function(val) {this.theBoardSize = val;};
    this.myColor = function() {return this.theMyColor;};
    this.setMyColorConverted = function(val) {if (val === "black") {this.theMyColor = GO.BLACK_STONE();} else if (val === "white") {this.theMyColor = GO.WHITE_STONE();} else {this.abend("setMyColor", val);}};
    this.setMyColor = function(val) {this.theMyColor = val;};
    this.hisColor = function() {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function() {return this.theHisName;};
    this.setHisName = function(val) {return this.theHisName = val;};
    this.setHandicapPoint = function(val) {this.theHandicapPoint = val;};
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
