/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayUiMouseObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.lastMouseX_ = 9;
        this.lastMouseY_ = 9;
        this.clearPendingRequestExist();
    };

    this.uiMouseMove = function(event_x, event_y) {
        if (this.pendingRequestExist()) return;
        const grid_len = this.getGridLength();
        const x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        const y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {
            return;
        }
        if ((this.lastMouseX() !== x) || (this.lastMouseY() !== y)) {
            //console.log("GoPlayUiMouseObject.uiMouseMove() (" + x + "," + y + ")");
            this.setLastMouseX(x);
            this.setLastMouseY(y);
            this.uiDisplayObject().drawBoard();
        }
    };

    this.uiClick = function(event_x, event_y) {
        if (this.pendingRequestExist()) return;
        if (event_x < this.canvasElement().getBoundingClientRect().left) {return;}
        if (event_y < this.canvasElement().getBoundingClientRect().top) {return;}
        if (event_x > this.canvasElement().getBoundingClientRect().left + this.canvasElement().getBoundingClientRect().width) {return;}
        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().height) {return;}
        const arrow_len = this.getArrowUnitLength();
        const grid_len = this.getGridLength();
        console.log("GoPlayUiMouseObject.uiClick() raw_data=(" + event_x + ", " + event_y + ")");

        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width) {
            if (event_y < this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len) {
                return;
            }
            if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len * 2) {
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 2.5) {
                this.portObject().transmitDoubleBackwardCommand();
                this.uiDisplayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 4.5) {
                this.portObject().transmitBackwardCommand();
                this.uiDisplayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 6.5) {
                this.portObject().transmitForwardCommand();
                this.uiDisplayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 8.5) {
                this.portObject().transmitDoubleForwardCommand();
                this.uiDisplayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 10.5) {
                if (this.gameObject().isMyTurn()) {
                    this.portObject().transmitPassCommand();
                    this.uiDisplayObject().drawBoard();
                }
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 12.5) {
                this.portObject().transmitConfirmCommand();
                this.uiDisplayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 14.5) {
                this.portObject().transmitResignCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 18.5) {
                this.portObject().transmitContinueCommand();
                this.uiDisplayObject().drawBoard();
                return;
            }
            return;
        }

        if (!this.gameObject().isMyTurn()) {
            console.log("GoPlayUiMouseObject.uiClick() not my turn");
            return;
        }

        const x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        const y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;

        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {
            return;
        }

        console.log("GoPlayUiMouseObject.uiClick() (" + x + "," + y + ")");
        this.gameObject().processNewMove(x, y);
    };

    this.pendingRequestExist = function() {return this.thePendingRequestExist;};
    this.setPendingRequestExist = function() {this.thePendingRequestExist = true;};
    this.clearPendingRequestExist = function() {this.thePendingRequestExist = false;};
    this.boardSize = () => this.configObject().boardSize();
    this.canvasElement = () => this.htmlObject().canvasElement();
    this.getGridLength = () => this.htmlObject().getGridLength();
    this.getArrowUnitLength = () => this.htmlObject().getArrowUnitLength();
    this.lastMouseX = () => this.lastMouseX_;
    this.setLastMouseX = (val) => {this.lastMouseX_ = val;};
    this.lastMouseY = () => this.lastMouseY_;
    this.setLastMouseY = (val) => {this.lastMouseY_ = val;};
    this.rootObject = () => this.rootObject_;
    this.configObject = () => this.rootObject().configObject();
    this.htmlObject = () => this.rootObject().htmlObject();
    this.uiDisplayObject = () => this.rootObject().uiDisplayObject();
    this.gameObject = () => this.rootObject().gameObject();
    this.portObject = () => this.rootObject().portObject();
    this.init__(root_object_val);
}
