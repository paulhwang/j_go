/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {
        this.rootObject_ = root_object_val;
        this.theCanvasWidth = 432;
        this.initElements();
        this.setupHtmlInput();
    };

    this.initElements = function() {
        this.theCanvasElement = window.document.getElementById("go_canvas");
        if (this.canvasElement() === null) {
            this.abend("GoUiObject", "null canvasElement");
            return;
        }
        this.canvasElement().setAttribute("style", "border:1px solid #000000;");
        this.canvasElement().width = this.canvasWidth();
        this.canvasElement().height = this.canvasWidth() * 1.1;
        this.theCanvasContext = this.canvasElement().getContext("2d");
        if (this.canvasContext() === null) {
            this.abend("GoUiObject", "null canvasContext");
            return;
        }
        this.theBlackScoreElement = window.document.getElementById("black_score");
        if (this.blackScoreElement() === null) {
            this.abend("GoUiObject", "null theBlackScoreElement");
            return;
        }
        this.theWhiteScoreElement = window.document.getElementById("white_score");
        if (this.whiteScoreElement() === null) {
            this.abend("GoUiObject", "null theWhiteScoreElement");
            return;
        }
    };

    this.setupHtmlInput = function(str1_val, str2_val) {
        const this0 = this;
        $("canvas").on("click", function(event) {
            this0.uiMouseObject().uiClick(event.clientX, event.clientY);
        });
        $("canvas").on("mousemove", function(event) {
            this0.uiMouseObject().uiMouseMove(event.clientX, event.clientY);
        });
    };

    this.rootObject = () => this.rootObject_;
    this.configObject = () => this.rootObject().configObject();
    this.uiMouseObject = () => this.rootObject().uiMouseObject();
    this.canvasWidth = () => this.theCanvasWidth;
    this.canvasElement = () => this.theCanvasElement;
    this.canvasContext = () => this.theCanvasContext;
    this.blackScoreElement = () => this.theBlackScoreElement;
    this.whiteScoreElement = () => this.theWhiteScoreElement;
    this.getGridLength = () => this.canvasElement().width / (this.configObject().boardSize() + 1);
    this.getArrowUnitLength = () => this.canvasElement().width / 20;
    this.init__(root_object_val);
}
