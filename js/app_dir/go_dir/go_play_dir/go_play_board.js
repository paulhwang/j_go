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
        for (let i = 0; i < 19; i++) {
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
        let index = 0;

        let total_count  = (str_val.charAt(index++) - '0') * 100;
            total_count += (str_val.charAt(index++) - '0') * 10;
            total_count += (str_val.charAt(index++) - '0');
        this.gameObject().setTotalMoves(total_count);

        const next_color = (str_val.charAt(index++) - '0');
        this.gameObject().setNextColor(next_color);

        for (let i = 0; i < this.boardSize(); i++) {
            for (let j = 0; j < this.boardSize(); j++) {
                this.boardArray_[i][j] = str_val.charAt(index++) - '0';
            }
        }

        let black_captured_stone  = (str_val.charAt(index++) - '0') * 100;
            black_captured_stone += (str_val.charAt(index++) - '0') * 10;
            black_captured_stone += (str_val.charAt(index++) - '0');
        this.blackCapturedStones_ = black_captured_stone;

        let white_captured_stone  = (str_val.charAt(index++) - '0') * 100;
            white_captured_stone += (str_val.charAt(index++) - '0') * 10;
            white_captured_stone += (str_val.charAt(index++) - '0');
        this.whiteCapturedStones_ = white_captured_stone;

        let last_stone_x  = (str_val.charAt(index++) - '0') * 10;
            last_stone_x += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadX(last_stone_x);

        let last_stone_y  = (str_val.charAt(index++) - '0') * 10;
            last_stone_y += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadY(last_stone_y);

        if (last_stone_y != 19) {
            this.gameObject().setValidLastDeadInfo(true);
        } else {
            this.gameObject().setValidLastDeadInfo(false);
        }
    };

    this.resetMarkedBoardObjectData = function() {
        for (let i = 0; i < this.boardSize(); i++) {
            for (var j = 0; j < this.boardSize(); j++) {
                this.setMarkedBoardArray(i, j, GO.EMPTY_STONE());
            }
        }
    };

    this.resetBoardObjectData = function() {
        for (let i = 0; i < this.boardSize(); i++) {
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
