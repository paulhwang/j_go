/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
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
        this.uFabricObj().putSessionDataRequest(data_val);
    };

    this.receiveFabricResponse = function(cmd_val, result_val, data1_val) {
        if (cmd_val !== FE_DEF.GET_LINK_DATA_RESPONSE()) {
            console.log("GoPlayPortObject.receiveFabricResponse() cmd=" + cmd_val + " result=" + result_val+ " data1=" + data1_val);
        }

        if (cmd_val === FE_DEF.PUT_SESSION_DATA_RESPONSE()) {
        }
        else if (cmd_val === FE_DEF.GET_SESSION_DATA_RESPONSE()) {
            const data = data1_val;
            if (data.charAt(0) === GO_DEF.GO_PROTOCOL_GAME_INFO().charAt(0)) {
                this.receiveGameData(data.slice(1));
                return;
            }
            if (data.charAt(0) === GO_DEF.GO_PROTOCOL_TIME_INFO().charAt(0)) {
                return;
            }
            if (data.charAt(0) === GO_DEF.GO_PROTOCOL_CHAT_INFO().charAt(0)) {
                return;
            }
        }
        else if (cmd_val === FE_DEF.GET_NAME_LIST_RESPONSE()) {
        }
        else if (cmd_val === FE_DEF.GET_LINK_DATA_RESPONSE()) {
        } 
        else {
            console.log("GoPlayPortObject.receiveFabricResponse() bad_cmd=" + cmd_val);
            abend();
        }
    };

    this.receiveGameData = function(data_val) {
        this.uiMouseObject().clearPendingRequestExist();
        this.boardObject().decodeBoard(data_val);
        this.uiDisplayObject().drawBoard();
    };

    this.rootObject = () => this.rootObject_;
    //this.fabricSessionPutGetObject = () => this.rootObject().fabricSessionPutGetObject();
    this.uFabricObj = () => this.rootObject().uFabricObj();
    this.dFabricObj = () => this.rootObject().dFabricObj();
    this.configObject = () => this.rootObject().configObject();
    this.gameObject = () => this.rootObject().gameObject();
    this.uiMouseObject = () => this.rootObject().uiMouseObject();
    this.boardObject = () => this.rootObject().boardObject();
    this.uiDisplayObject = () => this.rootObject().uiDisplayObject();
    this.init__(root_val);
}
