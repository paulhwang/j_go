/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayGameObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.theBlackCaptureStones = 0;
        this.theWhiteCaptureStones = 0;
        this.theLastDeadX = 0;
        this.theLastDeadY = 0;
        this.theValidLastDeadInfo = false;
        this.theBlackScoreString = null;
        this.theWhiteScoreString = null;
        this.theFinalScoreString = null;
        this.theTotalMoves = 0;
        this.theNextColor = GO.BLACK_STONE();
        this.theGameIsOver = false;

        this.setPlayBothsides();
    }

    this.setPlayBothsides = () => {
        if ( (this.sessionObject().groupMode() === 'S') ||
            ((this.sessionObject().groupMode() === 'D') && (this.sessionObject().firstFiddle() === this.sessionObject().secondFiddle())) ||
             (this.sessionObject().groupMode() === 'E')) {
            this.playBothSides_ = true;
        }
        else {
            this.playBothSides_ = false;
        }
        console.log("GoPlayGameObject.setPlayBothsides() playBothSides=" + this.playBothSides());
    };

    this.processNewMove = function(x_val, y_val) {
        console.log("GoPlayGameObject.processNewMove() (" + x_val + "," + y_val + ")");
        if (this.gameIsOver()) {
            let move = new GoMoveObject(null, x_val, y_val, GO.THE_MARK_DEAD_STONE_DIFF, this.totalMoves(), this.containerObject());
            this.portObject().transmitMoveData(move);
            return;
        }
        if (!this.isValidMoveOnBoard(x_val, y_val)) {
            return;
        }
        let move = new GoMoveObject(null, x_val, y_val, this.nextColor(), this.totalMoves() + 1, this.rootObject());
        this.portObject().transmitMoveData(move);
    };

    this.isValidMoveOnBoard = function(x_val, y_val) {
        if (this.boardObject().boardArray(x_val, y_val) !== GO.EMPTY_STONE()) {
            return false;
        }
        if (this.validLastDeadInfo() && (x_val === this.lastDeadX()) && (y_val === this.lastDeadY())) {
            return false;
        }
        return true;
    };

    this.isMyTurn = function() {
        let result = (this.playBothSides()) || (this.nextColor() === this.configObject().myColor());
        return result;
    };

    this.playBothSides = () => this.playBothSides_;

    this.totalMoves = function() {return this.theTotalMoves;};
    this.setTotalMoves = function(total_moves_val) {this.theTotalMoves = total_moves_val;};
    this.nextColor = function() {return this.theNextColor;};
    this.setNextColor = function(next_color_val) {this.theNextColor = next_color_val;};
    this.gameIsOver = function() {return this.theGameIsOver;};
    this.setGameIsOver = function() {this.theGameIsOver = true;};
    this.clearGameIsOver = function() {this.theGameIsOver = false;};
    this.lastDeadX = function() {return this.theLastDeadX;};
    this.setLastDeadX = function(val) {this.theLastDeadX = val;};
    this.lastDeadY = function() {return this.theLastDeadY;};
    this.setLastDeadY = function(val) {this.theLastDeadY = val;};
    this.validLastDeadInfo = function() {return this.theValidLastDeadInfo;};
    this.setValidLastDeadInfo = function(val) {this.theValidLastDeadInfo = val;};
    this.blackScoreString = function() {return this.theBlackScoreString;}
    this.setBlackScoreString = function(val) {this.theBlackScoreString = val;}
    this.whiteScoreString = function() {return this.theWhiteScoreString;}
    this.setWhiteScoreString = function(val) {this.theWhiteScoreString = val;}
    this.finalScoreString = function() {return this.theFinalScoreString;}
    this.setFinalScoreString = function(val) {this.theFinalScoreString = val;}

    this.rootObject = () => this.rootObject_;
    this.storageObject = () => this.rootObject().storageObject();
    this.configObject = () => this.rootObject().configObject();
    this.boardObject = () => this.rootObject().boardObject();
    this.portObject = () => this.rootObject().portObject();
    this.linkObject = () => this.rootObject().linkObject();
    this.sessionObject = () => this.rootObject().sessionObject();
    this.init__(root_object_val);
};
