/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: GoDefineObject.js
 */

var GO = new GoDefineObject;
function GoDefineObject() {
    this.EMPTY_STONE = function () {return 0;};
    this.BLACK_STONE = function () {return 1;};
    this.WHITE_STONE = function () {return 2;};
    this.BOTH_COLOR_STONE = function () {return 2;};
    this.MARK_DEAD_STONE_DIFF = function () {return 4;};
    this.MARK_EMPTY_STONE_DIFF = function () {return 6;};
    this.MARKED_DEAD_BLACK_STONE = function () {return this.BLACK_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_DEAD_WHITE_STONE = function () {return this.WHITE_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_EMPTY_BLACK_STONE = function () {return this.BLACK_STONE() + this.MARK_EMPTY_STONE_DIFF();};
    this.MARKED_EMPTY_WHITE_STONE = function () {return this.WHITE_STONE() + this.MARK_EMPTY_STONE_DIFF();};

    this.getOppositeColor = function (color_val) {
        switch (color_val) {
        case GO.BLACK_STONE():
            return GO.WHITE_STONE();

        case GO.WHITE_STONE():
            return GO.BLACK_STONE();

        default:
            this.goAbend("getOppositeColor", "color=" + color_val);
            return GO.EMPTY_STONE();
        }
    };

    this.isNeighborStone = function (x1_val, y1_val, x2_val, y2_val) {
        if (x1_val === x2_val) {
            if ((y1_val + 1 === y2_val) || (y1_val - 1 === y2_val)) {
                return true;
            }
        }
        if (y1_val === y2_val) {
            if ((x1_val + 1 === x2_val) || (x1_val - 1 === x2_val)) {
                return true;
            }
        }
        return false;
    };
}
