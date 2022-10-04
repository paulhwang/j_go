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
        const go_config_data = sessionStorage.getItem("theme_data");

        if ((go_config_data === undefined) || (go_config_data === "")) {
            this.theBoardSize = 19;
            this.theHandicapPoint = 0;
            this.theKomiPoint = 0;
            return;
        }

        var index = 2;
        this.boardSize_ = (go_config_data.charAt(index++) - '0') * 10
        this.boardSize_ += go_config_data.charAt(index++) - '0';

        this.handicapPoint_ = (go_config_data.charAt(index++) - '0') * 10
        this.handicapPoint_ += go_config_data.charAt(index++) - '0';

        this.komiPoint_ = (go_config_data.charAt(index++) - '0') * 10
        this.komiPoint_ += go_config_data.charAt(index++) - '0';

        this.firstFiddleColor_ = go_config_data.charAt(index++) - '0';

        if (this.rootObject().linkObject().myName() === this.rootObject().sessionObject().firstFiddle()) {
            this.myColor_ = this.firstFiddleColor_;
        }
        else {
            if (this.firstFiddleColor_ === GO.BLACK_STONE) {
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
        console.log("GoConfigObject.decode() first_fiddle_color=" + this.firstFiddleColor());
        console.log("GoConfigObject.decode() myColor=" + this.myColor());
    }

    this.boardSize = () => this.boardSize_;
    this.handicapPoint = () => this.handicapPoint_;
    this.komiPoint = () => this.komiPoint_;
    this.firstFiddleColor = () => this.firstFiddleColor_;
    this.myColor = () => this.myColor_;
    this.rootObject = () => this.rootObject_;
    this.init__(root_val);
}
