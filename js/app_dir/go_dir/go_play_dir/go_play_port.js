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
    this.init__ = function(root_val) {this.theRootObject = root_val;};
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
        this.debug(false, "transmitGameData", "data_val=" + data_val);
        this.inputObject().setPendingRequestExist();
        this.transmitData(this.GO_PROTOCOL_GAME_INFO() + data_val);
    };
    this.transmitData = function(data_val) {
        this.debug(true, "transmitData", "data_val=" + data_val);
        this.rootObject().fabricObject().sendPutSessionDataRequest(data_val);
        //this.phwangSessionObject().transmitData(data_val);
    };
    this.receiveData = function(data_val) {
        this.debug(true, "receiveData", "data_val=" + data_val);
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
        this.abend("receiveData", "data_val=" + data_val);
    };
    this.receiveGameData = function(data_val) {
        this.inputObject().clearPendingRequestExist();
        this.boardObject().decodeBoard(data_val);
        this.displayObject().drawBoard();
    };
    this.objectName = function() {return "GoPlayPortObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.ajxObject = function() {return this.rootObject().ajxObject();};
    this.configObject = function() {return this.rootObject().configObject(); };
    this.gameObject = function() {return this.rootObject().gameObject();};
    this.inputObject = function() {return this.rootObject().inputObject();};
    this.phwangSessionObject = function() {return this.rootObject().phwangSessionObject();};
    this.boardObject = function() {return this.rootObject().boardObject();};
    this.displayObject = function() {return this.rootObject().displayObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_val);
}
