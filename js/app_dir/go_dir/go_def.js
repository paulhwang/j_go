/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

var GO_DEF = new Go_DEF_OJBECT;

function Go_DEF_OJBECT() {
    "use strict";
    this.EMPTY_STONE = () => 0;
    this.BLACK_STONE = () => 1;
    this.WHITE_STONE = () => 2;

    this.GO_PROTOCOL_GAME_INFO = () => "G";
    this.GO_PROTOCOL_TIME_INFO = () => "T";
    this.GO_PROTOCOL_CHAT_INFO = () => "C";

    this.GO_PROTOCOL_MOVE_COMMAND            = () => "M";
    this.GO_PROTOCOL_PASS_COMMAND            = () => "P";
    this.GO_PROTOCOL_BACKWARD_COMMAND        = () => "b";
    this.GO_PROTOCOL_DOUBLE_BACKWARD_COMMAND = () => "B";
    this.GO_PROTOCOL_FORWARD_COMMAND         = () => "f";
    this.GO_PROTOCOL_DOUBLE_FORWARD_COMMAND  = () => "F";
    this.GO_PROTOCOL_RESIGN_COMMAND          = () => "R";
    this.GO_PROTOCOL_CONFIRM_COMMAND         = () => "C";
    this.GO_PROTOCOL_CONTINUE_COMMAND        = () => "c";

    this.BOTH_COLOR_STONE = function() {return 2;};
    this.MARK_DEAD_STONE_DIFF = function() {return 4;};
    this.MARK_EMPTY_STONE_DIFF = function() {return 6;};
    this.MARKED_DEAD_BLACK_STONE = function() {return this.BLACK_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_DEAD_WHITE_STONE = function() {return this.WHITE_STONE() + this.MARK_DEAD_STONE_DIFF();};
    this.MARKED_EMPTY_BLACK_STONE = function() {return this.BLACK_STONE() + this.MARK_EMPTY_STONE_DIFF();};
    this.MARKED_EMPTY_WHITE_STONE = function() {return this.WHITE_STONE() + this.MARK_EMPTY_STONE_DIFF();};
}
