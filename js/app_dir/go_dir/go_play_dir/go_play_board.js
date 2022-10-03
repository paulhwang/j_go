/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayBoardObject(root_val) {
    "use strict";
    this.init__ = function (root_val) {
        this.rootObject_ = root_val;
        this.boardArray_ = [19];
        this.markedBoardArray_ = [19];
        for (var i = 0; i < 19; i++) {
            this.boardArray_[i] = [19];
            this.markedBoardArray_[i] = [19];
        }
        this.resetBoardObjectData();
    };
    /*
    this.addStoneToBoard = function(x_val, y_val, color_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToBoard", "x=" + x_val + " y=" + y_val);
            return;
        }
        this.setBoardArray(x_val, y_val, color_val);
    };
    this.addStoneToMarkedBoard = function(x_val, y_val, color_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToMarkedBoard", "x=" + x_val + " y=" + y_val);
            return;
        }
        this.setMarkedBoardArray(x_val, y_val, color_val);
    };
    this.removeStoneFromMarkedBoard = function(x_val, y_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToMarkedBoard", "x=" + x_val + " y=" + y_val);
            return;
        }
        this.setMarkedBoardArray(x_val, y_val, GO.EMPTY_STONE());
    };
    this.isEmptySpace = function(x_val, y_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            return false;
        }
        if (this.boardArray(x_val, y_val) !== GO.EMPTY_STONE()) {
            return false;
        }
        return true;
    };
    */
    this.decodeBoard = function(str_val) {
        var index = 0;
        var num;
        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setTotalMoves(num);
        num = (str_val.charAt(index++) - '0');
        this.gameObject().setNextColor(num);
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.boardArray_[i][j] = str_val.charAt(index++) - '0';
            }
        }
        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.blackCapturedStones_ = num;

        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.whiteCapturedStones_ = num;

        num  = (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadX(num);

        num  = (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadY(num);

        if (num != 19) {
            this.gameObject().setValidLastDeadInfo(true);
        } else {
            this.gameObject().setValidLastDeadInfo(false);
        }
    };
    this.resetMarkedBoardObjectData = function() {
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.setMarkedBoardArray(i, j, GO.EMPTY_STONE());
            }
        }
    };
    this.resetBoardObjectData = function() {
        for (var i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.setBoardArray(i, j, GO_DEF.EMPTY_STONE());
            }
        }
    };

    this.boardSize = () => this.configObject().boardSize();
    this.blackCapturedStones = () => this.blackCapturedStones_;
    this.whiteCapturedStones = () => this.whiteCapturedStones_;
    this.boardArray = (x_val, y_val) => this.boardArray_[x_val][y_val];

    this.markedBoardArray = function (x_val, y_val) {return this.markedBoardArray_[x_val][y_val];};
    this.setBoardArray = function (x_val, y_val, data_val) {this.boardArray_[x_val][y_val] = data_val;};
    this.setMarkedBoardArray = function (x_val, y_val, data_val) {this.markedBoardArray_[x_val][y_val] = data_val;};

    this.rootObject = () => this.rootObject_;
    this.configObject = () => this.rootObject().configObject();
    this.gameObject = () => this.rootObject().gameObject();
    this.init__(root_val);
}
