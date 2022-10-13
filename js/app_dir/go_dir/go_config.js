/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoConfigObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObj_ = root_val;
    };
    
    this.decode = function() {
        const go_config_data = sessionStorage.getItem("theme_data");

        if ((go_config_data === undefined) || (go_config_data === "")) {
            this.theBoardSize = 19;
            this.theHandicapPoint = 0;
            this.theKomiPoint = 0;
            return;
        }

        let index = 0;
        this.boardSize_ = (go_config_data.charAt(index++) - '0') * 10
        this.boardSize_ += go_config_data.charAt(index++) - '0';

        this.handicapPoint_ = (go_config_data.charAt(index++) - '0') * 10
        this.handicapPoint_ += go_config_data.charAt(index++) - '0';

        this.komiPoint_ = (go_config_data.charAt(index++) - '0') * 10
        this.komiPoint_ += go_config_data.charAt(index++) - '0';

        this.firstFiddleColor_ = go_config_data.charAt(index++) - '0';

        if (this.linkObj().myName() === this.sessionObj().firstFiddle()) {
            this.myColor_ = this.firstFiddleColor_;
        }
        else {
            if (this.firstFiddleColor_ === GO_DEF.BLACK_STONE()) {
                this.myColor_ = GO_DEF.WHITE_STONE();
            }
            else {
                this.myColor_ = GO_DEF.BLACK_STONE();
            }
        }
    };

    this.printConfigInfo = function() {
        console.log("GoConfigObject.decode() board_size=" + this.boardSize());
        console.log("GoConfigObject.decode() handicap=" + this.handicapPoint());
        console.log("GoConfigObject.decode() komi=" + this.komiPoint());
        console.log("GoConfigObject.decode() first_fiddle_color=" + this.firstFiddleColor());
        console.log("GoConfigObject.decode() myColor=" + this.myColor());
    }

    this.encodeGoConfig = function(board_size_val, handicap_val, komi_val, initiator_color_val) {
        let initiator_color;
        if (initiator_color_val == "black")
            initiator_color = 1;
        else
            initiator_color = 2;

        let buf = "";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        if (handicap_val < 10)   buf = buf + 0; buf = buf + handicap_val;
        if (komi_val < 10)       buf = buf + 0; buf = buf + komi_val;
        buf = buf + initiator_color;
        return buf;
    };

    this.encodeGoSoloConfig = function(board_size_val) {
        let buf = "";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        buf = buf + "00001";
        return buf;
    };

    this.boardSize = () => this.boardSize_;
    this.handicapPoint = () => this.handicapPoint_;
    this.komiPoint = () => this.komiPoint_;
    this.firstFiddleColor = () => this.firstFiddleColor_;
    this.myColor = () => this.myColor_;
    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().linkObj();
    this.sessionObj = () => this.rootObj().sessionObj();
    this.init__(root_val);
}
