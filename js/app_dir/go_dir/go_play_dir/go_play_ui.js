/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayDisplayObject(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {
        this.rootObject_ = root_object_val;
        this.drawArrows();
        this.drawBoard();
    };

    this.drawBoard = function() {
        const arrow_color = "black";
        const grid_len = this.getGridLength();
        //var half_grid_len = grid_len / 2;
        const micro_grid_len = grid_len / 8;
        //var radius = 3.2 * micro_grid_len;
        const context = this.canvasContext();
        //var canvas_extra = this.canvasElement_().height - this.canvasElement_().width;
        context.fillStyle = arrow_color;
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        this.drawArrows();
        context.fillStyle = "#FF8000";
        context.fillRect(0, 0, this.canvasElement().width, this.canvasElement().width);
        this.drawEmptyBoard();
        this.drawStones();
        if (this.gameObject().gameIsOver()) {
            this.drawMarkedStones();
            //////////////////this.drawLandMarks();
        }
        this.drawCandidateStone();
        this.drawScore();
    };

    this.drawEmptyBoard = function() {
        const grid_len = this.getGridLength();
        const context = this.canvasContext();
        this.setBoardColor();
        context.lineWidth = 1;
        let i = 1;
        while (i <= this.boardSize()) {
            context.moveTo(grid_len, grid_len * i);
            context.lineTo(grid_len * this.boardSize(), grid_len * i);
            context.stroke();
            context.moveTo(grid_len * i, grid_len);
            context.lineTo(grid_len * i, grid_len * this.boardSize());
            context.stroke();
            i += 1;
        }
        if (this.boardSize() === 9) {
            drawBoardDot(5, 5);
        } else if (this.boardSize() === 13) {
            drawBoardDot(4, 4);
            drawBoardDot(4, 10);
            drawBoardDot(10, 4);
            drawBoardDot(10, 10);
            drawBoardDot(7, 7);
        } else if (this.boardSize() === 19) {
            drawBoardDot(4, 4);
            drawBoardDot(4, 10);
            drawBoardDot(4, 16);
            drawBoardDot(10, 4);
            drawBoardDot(10, 10);
            drawBoardDot(10, 16);
            drawBoardDot(16, 4);
            drawBoardDot(16, 10);
            drawBoardDot(16, 16);
        }
        function drawBoardDot(x_val, y_val) {
            context.beginPath();
            context.arc(x_val * grid_len, y_val * grid_len, 3, 0, 2 * Math.PI, false);
            context.fillStyle = 'black';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    };

    this.setBoardColor = function() {
        this.canvasContext().fillStyle = "#FF8000";
        this.canvasContext().fillRect(0, 0, this.canvasElement().width, this.canvasElement().width);
    };

    this.drawStones = function() {
        const grid_len = this.getGridLength();
        const micro_grid_len = grid_len / 8;
        const radius = 3.2 * micro_grid_len;
        const context = this.canvasContext();
        let paint = null;
        for (let i = 0; i < this.boardSize(); i++) {
            for (let j = 0; j < this.boardSize(); j++) {
                if (this.boardObject().boardArray(i, j) === GO_DEF.BLACK_STONE()) {
                    paint = "black";
                } else if (this.boardObject().boardArray(i, j) === GO_DEF.WHITE_STONE()) {
                    paint = "white";
                }
                if (paint) {
                    this.drawOneStone(i, j, paint);
                    paint = null;
                }
            }
        }
    };

    this.drawOneStone = function (x_val, y_val, paint_val) {
        const grid_len = this.getGridLength();
        const micro_grid_len = grid_len / 8;
        const radius = 3.2 * micro_grid_len;
        const context = this.canvasContext();
        context.beginPath();
        context.arc((x_val + 1) * grid_len, (y_val + 1) * grid_len, radius, 0, 2 * Math.PI, false);
        context.fillStyle = paint_val;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    };

    this.drawCandidateStone = function() {
        if (!this.gameObject().isMyTurn() && !this.gameObject().gameIsOver()) {
            return;
        }
        const grid_len = this.getGridLength();
        const micro_grid_len = grid_len / 8;
        const radius = 1.5 * micro_grid_len;
        const context = this.canvasContext();
        let paint;
        if (this.gameObject().nextColor() === GO_DEF.BLACK_STONE()) {
            paint = "black";
            if (this.gameObject().gameIsOver()) {
                paint = "gray";
            }
            context.beginPath();
            context.arc((this.uiMouseObject().lastMouseX() + 1) * grid_len, (this.uiMouseObject().lastMouseY() + 1) * grid_len, radius, 0, 2 * Math.PI, false);
            context.fillStyle = paint;
            context.fill();
            //context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        } else {
            paint = "white";
            if (this.gameObject().gameIsOver()) {
                paint = "gray";
            }
            context.beginPath();
            context.arc((this.uiMouseObject().lastMouseX() + 1) * grid_len, (this.uiMouseObject().lastMouseY() + 1) * grid_len, radius, 0, 2 * Math.PI, false);
            context.fillStyle = paint;
            context.fill();
            //context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    };

    this.drawArrows = function() {
        const arrow_len = this.getArrowUnitLength();
        const context = this.canvasContext();

        context.beginPath();
        context.moveTo(arrow_len * 0.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 0.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(arrow_len * 1.25, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 2,    arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 2,    arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 3, arrow_len  * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 4, arrow_len        + this.canvasElement().width);
        context.lineTo(arrow_len * 4, arrow_len  * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 3, arrow_len  * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 5, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 6, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 5, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 5, arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 7,    arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 7,    arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 7,    arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(arrow_len * 7.75, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 8.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.moveTo(arrow_len * 8.5, arrow_len     + this.canvasElement().width);
        context.lineTo(arrow_len * 8.5, arrow_len * 2 + this.canvasElement().width);
        context.stroke();

        context.moveTo(arrow_len * 0.5, arrow_len     + this.canvasElement().width);
        context.lineTo(arrow_len * 0.5, arrow_len * 2 + this.canvasElement().width);
        context.stroke();

        context.fillStyle = "pink";
        context.fillRect(arrow_len * 8.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "yellow";
        context.fillRect(arrow_len * 10.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "pink";
        context.fillRect(arrow_len * 12.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "yellow";
        context.fillRect(arrow_len * 14.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "pink";
        context.fillRect(arrow_len * 16.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
    };

    this.drawScore = function() {
        this.blackScoreElement().textContent = this.gameObject().blackScoreString();
        this.whiteScoreElement().textContent = this.gameObject().whiteScoreString();
        //this.finalScoreElement().textContent = this.gameObject().finalScoreString();
        this.blackScoreElement().textContent = "Black: " + this.boardObject().blackCapturedStones();
        this.whiteScoreElement().textContent = "White: " + this.boardObject().whiteCapturedStones();
    };

    this.boardSize = () => this.configObject().boardSize();
    this.canvasElement = () => this.htmlObject().canvasElement();
    this.canvasContext = () => this.htmlObject().canvasContext();
    this.blackScoreElement = () => this.htmlObject().blackScoreElement();
    this.whiteScoreElement = () => this.htmlObject().whiteScoreElement();
    this.getGridLength = () => this.htmlObject().getGridLength();
    this.getArrowUnitLength = () => this.htmlObject().getArrowUnitLength();
    this.rootObject = () => this.rootObject_;
    this.configObject = () => this.rootObject().configObject();
    this.htmlObject = () => this.rootObject().htmlObject();
    this.uiMouseObject = () => this.rootObject().uiMouseObject();
    this.boardObject = () => this.rootObject().boardObject();
    this.gameObject = () => this.rootObject().gameObject();
    this.init__(root_object_val);
}
