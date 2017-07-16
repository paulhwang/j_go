/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayInputObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theLastMouseX = 9;
        this.theLastMouseY = 9;
        this.clearPendingRequestExist();
        this.debug(false, "init__", "");
    };

    this.uiMouseMove = function (event_x, event_y) {
        if (this.pendingRequestExist()) return;

        var grid_len = this.getGridLength();
        var x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        var y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {
            return;
        }

        if ((this.lastMouseX() !== x) || (this.lastMouseY() !== y)) {
            this.debug(false, "uiMouseMove", "(" + x + "," + y + ")");
            this.setLastMouseX(x);
            this.setLastMouseY(y);
            this.displayObject().drawBoard();
        }
    };

    this.uiClick = function (event_x, event_y) {
        if (this.pendingRequestExist()) return;
        if (event_x < this.canvasElement().getBoundingClientRect().left) {return;}
        if (event_y < this.canvasElement().getBoundingClientRect().top) {return;}
        if (event_x > this.canvasElement().getBoundingClientRect().left + this.canvasElement().getBoundingClientRect().width) {return;}
        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().height) {return;}
        var arrow_len = this.getArrowUnitLength();
        var grid_len = this.getGridLength();
        this.debug(false, "uiClick", "raw_data=(" + event_x + ", " + event_y + ")");

        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width) {
            if (event_y < this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len) {
                return;
            }
            if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len * 2) {
                return;
            }

            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 2.5) {
                this.portObject().transmitDoubleBackwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 4.5) {
                this.portObject().transmitBackwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 6.5) {
                this.portObject().transmitForwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 8.5) {
                this.portObject().transmitDoubleForwardCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 10.5) {
                if (this.gameObject().isMyTurn()) {
                    this.portObject().transmitPassCommand();
                    this.displayObject().drawBoard();
                }
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 12.5) {
                this.portObject().transmitConfirmCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 14.5) {
                this.portObject().transmitResignCommand();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 18.5) {
                this.portObject().transmitContinueCommand();
                this.displayObject().drawBoard();
                return;
            }
            return;
        }

        if (!this.gameObject().isMyTurn()) {this.debug(true, "uiClick", "not my turn"); return;}
        var x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        var y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {return;}
        this.debug(false, "uiClick", "(" + x + "," + y + ")");
        this.gameObject().processNewMove(x, y);
    };

    this.pendingRequestExist = function () {return this.thePendingRequestExist;};
    this.setPendingRequestExist = function () {this.thePendingRequestExist = true;};
    this.clearPendingRequestExist = function () {this.thePendingRequestExist = false;};
    this.boardSize = function () {return this.configObject().boardSize();};
    this.canvasElement = function () {return this.htmlObject().canvasElement();};
    this.getGridLength = function () {return this.htmlObject().getGridLength();};
    this.getArrowUnitLength = function () {return this.htmlObject().getArrowUnitLength();};
    this.lastMouseX = function () {return this.theLastMouseX;};
    this.setLastMouseX = function (val) {this.theLastMouseX = val;};
    this.lastMouseY = function () {return this.theLastMouseY;};
    this.setLastMouseY = function (val) {this.theLastMouseY = val;};
    this.objectName = function () {return "GoPlayInputObject";};
    this.rootObject = function () {return this.theRootObject;};
    this.configObject = function () {return this.rootObject().configObject();};
    this.htmlObject = function () {return this.rootObject().htmlObject();};
    this.displayObject = function () {return this.rootObject().displayObject();};
    this.gameObject = function () {return this.rootObject().gameObject();};
    this.portObject = function () {return this.rootObject().portObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
