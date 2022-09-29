/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayPortObject(root_val) {
    "use strict";
    this.GO_PROTOCOL_GAME_INFO = function() {return "G";};
    this.GO_PROTOCOL_TIME_INFO = function() {return "T";};
    this.GO_PROTOCOL_CHAT_INFO = function() {return "C";};
    this.GO_PROTOCOL_MOVE_COMMAND = function() {return "M";};
    this.GO_PROTOCOL_PASS_COMMAND = function() {return "P";};
    this.GO_PROTOCOL_BACKWARD_COMMAND = function() {return "b";};
    this.GO_PROTOCOL_DOUBLE_BACKWARD_COMMAND = function() {return "B";};
    this.GO_PROTOCOL_FORWARD_COMMAND = function() {return "f";};
    this.GO_PROTOCOL_DOUBLE_FORWARD_COMMAND = function() {return "F";};
    this.GO_PROTOCOL_RESIGN_COMMAND = function() {return "R";};
    this.GO_PROTOCOL_CONFIRM_COMMAND = function() {return "C";};
    this.GO_PROTOCOL_CONTINUE_COMMAND = function() {return "c";};

    this.init__ = function(root_val) {
      this.rootObject_ = root_val;
    };

    this.transmitMoveData = function(move_val) {this.transmitGameData(this.GO_PROTOCOL_MOVE_COMMAND() + move_val.encodeMove());};
    this.transmitPassCommand = function() {this.transmitGameData(this.GO_PROTOCOL_PASS_COMMAND());};
    this.transmitBackwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_BACKWARD_COMMAND());};
    this.transmitDoubleBackwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_DOUBLE_BACKWARD_COMMAND());};
    this.transmitForwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_FORWARD_COMMAND());};
    this.transmitDoubleForwardCommand = function() {this.transmitGameData(this.GO_PROTOCOL_DOUBLE_FORWARD_COMMAND());};
    this.transmitResignCommand = function() {this.transmitGameData(this.GO_PROTOCOL_RESIGN_COMMAND());};
    this.transmitConfirmCommand = function() {this.transmitGameData(this.GO_PROTOCOL_CONFIRM_COMMAND());};
    this.transmitContinueCommand = function() {this.transmitGameData(this.GO_PROTOCOL_CONTINUE_COMMAND());};

    this.transmitGameData = function(data_val) {
        console.log("GoPlayPortObject.transmitGameData() data_val=" + data_val);
        this.inputObject().setPendingRequestExist();
        this.transmitData(this.GO_PROTOCOL_GAME_INFO() + data_val);
    };

    this.transmitData = function(data_val) {
        console.log("GoPlayPortObject.transmitData() data_val=" + data_val);
        this.rootObject().fabricObject().sendPutSessionDataRequest(data_val);
    };

    this.receiveData = function(data_val) {
        console.log("GoPlayPortObject.receiveData() data_val=" + data_val);
        if (data_val.charAt(0) === this.GO_PROTOCOL_GAME_INFO().charAt(0)) {
            this.receiveGameData(data_val.slice(1));
            return;
        }
        if (data_val.charAt(0) === this.GO_PROTOCOL_TIME_INFO().charAt(0)) {
            return;
        }
        if (data_val.charAt(0) === this.GO_PROTOCOL_CHAT_INFO().charAt(0)) {
            return;
        }
    };

    this.receiveGameData = function(data_val) {
        this.inputObject().clearPendingRequestExist();
        this.boardObject().decodeBoard(data_val);
        this.displayObject().drawBoard();
    };

    this.rootObject = () => this.rootObject_;
    this.configObject = () => this.rootObject().configObject();
    this.gameObject = () => this.rootObject().gameObject();
    this.inputObject = () => this.rootObject().inputObject();
    this.boardObject = () => this.rootObject().boardObject();
    this.displayObject = () => this.rootObject().displayObject();
    this.init__(root_val);
}
