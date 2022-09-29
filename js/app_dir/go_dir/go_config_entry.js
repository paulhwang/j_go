/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoConfigObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
    };
    
    this.decode = function() {
        var go_config_data = sessionStorage.getItem("theme_data");

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
        this.boardSize_ = (go_config_data.charAt(index++) - '0') * 10
        this.boardSize_ += go_config_data.charAt(index++) - '0';

        this.handicapPoint_ = (go_config_data.charAt(index++) - '0') * 10
        this.handicapPoint_ += go_config_data.charAt(index++) - '0';

        this.komiPoint_ = (go_config_data.charAt(index++) - '0') * 10
        this.komiPoint_ += go_config_data.charAt(index++) - '0';

        this.initiatorColor_ = go_config_data.charAt(index++) - '0';

        if (this.rootObject().linkObject().myName() === this.rootObject().sessionObject().initiatorName()) {
            this.myColor_ = this.initiatorColor_;
        }
        else {
            if (this.initiatorColor_ === GO.BLACK_STONE) {
                this.myColor_ = GO.WHITE_STONE;
            }
            else {
                this.myColor_ = GO.BLACK_STONE;
            }
        }
    };

    this.printConfigInfo = function() {
        console.log("GoConfigObject.decode() board_size=" + this.boardSize());
        console.log("GoConfigObject.decode() handicap=" + this.handicapPoint());
        console.log("GoConfigObject.decode() komi=" + this.komiPoint());
        console.log("GoConfigObject.decode() initiator_color=" + this.initiatorColor());
        console.log("GoConfigObject.decode() myColor=" + this.myColor());
    }

    this.boardSize = () => this.boardSize_;
    this.handicapPoint = () => this.handicapPoint_;
    this.komiPoint = () => this.komiPoint_;
    this.initiatorColor = () => this.initiatorColor_;
    this.myColor = () => this.myColor_;
    this.rootObject = () => this.rootObject_;
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
