/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoPlayConfigObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.theRootObject = root_val;
        this.cacheConfig();
        this.debug(true, "init__", "myColor=" + this.myColor() + " boardSize=" + this.boardSize() + " handicapPoint=" + this.handicapPoint() + " komiPoint=" + this.komiPoint());
    };
    this.cacheConfig = function() {
        this.setBoardSize(this.configStorageObject().boardSize());
        this.setMyColor(this.configStorageObject().myColor());
    }
    this.boardSize = function() {return this.theBoardSize;};
    this.setBoardSize = function(val) {this.theBoardSize = val;};
    this.myColor = function() {return this.theMyColor;};
    this.setMyColor = function(val) {this.theMyColor = val;};
    this.hisColor = function() {if (this.myColor() === GO.BLACK_STONE()) {return GO.WHITE_STONE();} else {return GO.BLACK_STONE();}};
    this.hisName = function() {return this.configStorageObject().hisName();};
    this.handicapPoint = function() {return this.configStorageObject().handicapPoint();};
    this.komiPoint = function() {return this.configStorageObject().komiPoint();};
    this.realKomiPoint = function() {if (!this.komiPoint()) {return 0;} return this.komiPoint() + 0.5;};
    this.isValidCoordinates = function(x_val, y_val) {return this.isValidCoordinate(x_val) && this.isValidCoordinate(y_val);};
    this.isValidCoordinate = function(coordinate_val) {return (0 <= coordinate_val) && (coordinate_val < this.boardSize());};
    this.objectName = function() {return "GoPlayConfigObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.configStorageObject = function () {return this.rootObject().configStorageObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}
