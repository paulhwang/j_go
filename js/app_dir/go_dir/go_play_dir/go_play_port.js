/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricResponseObject().setCallbackFunc(this.receiveData, this);
    };

    this.transmitMoveData              = function(move_val) {this.transmitGameData(GO_DEF.GO_PROTOCOL_MOVE_COMMAND() + move_val.encodeMove());};
    this.transmitPassCommand           = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_PASS_COMMAND());};
    this.transmitBackwardCommand       = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_BACKWARD_COMMAND());};
    this.transmitDoubleBackwardCommand = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_DOUBLE_BACKWARD_COMMAND());};
    this.transmitForwardCommand        = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_FORWARD_COMMAND());};
    this.transmitDoubleForwardCommand  = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_DOUBLE_FORWARD_COMMAND());};
    this.transmitResignCommand         = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_RESIGN_COMMAND());};
    this.transmitConfirmCommand        = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_CONFIRM_COMMAND());};
    this.transmitContinueCommand       = function() {this.transmitGameData(GO_DEF.GO_PROTOCOL_CONTINUE_COMMAND());};

    this.transmitGameData = function(data_val) {
        console.log("GoPlayPortObject.transmitGameData() data_val=" + data_val);
        this.uiMouseObject().setPendingRequestExist();
        this.transmitData(GO_DEF.GO_PROTOCOL_GAME_INFO() + data_val);
    };

    this.transmitData = function(data_val) {
        console.log("GoPlayPortObject.transmitData() data_val=" + data_val);
        this.fabricRequestObject().putSessionDataRequest(data_val);
    };

    this.receiveData = function(data_val) {
        console.log("GoPlayPortObject.receiveData() data_val=" + data_val);
        if (data_val.charAt(0) === GO_DEF.GO_PROTOCOL_GAME_INFO().charAt(0)) {
            this.receiveGameData(data_val.slice(1));
            return;
        }
        if (data_val.charAt(0) === GO_DEF.GO_PROTOCOL_TIME_INFO().charAt(0)) {
            return;
        }
        if (data_val.charAt(0) === GO_DEF.GO_PROTOCOL_CHAT_INFO().charAt(0)) {
            return;
        }
    };

    this.receiveGameData = function(data_val) {
        this.uiMouseObject().clearPendingRequestExist();
        this.boardObject().decodeBoard(data_val);
        this.uiDisplayObject().drawBoard();
    };

    this.rootObject = () => this.rootObject_;
    this.fabricSessionPutGetObject = () => this.rootObject().fabricSessionPutGetObject();
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.configObject = () => this.rootObject().configObject();
    this.gameObject = () => this.rootObject().gameObject();
    this.uiMouseObject = () => this.rootObject().uiMouseObject();
    this.boardObject = () => this.rootObject().boardObject();
    this.uiDisplayObject = () => this.rootObject().uiDisplayObject();
    this.init__(root_val);
}
