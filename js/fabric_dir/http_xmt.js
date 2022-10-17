/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpXmtClass(u_fabric_obj_val) {
    "use strict";
    this.init__ = (u_fabric_obj_val) => {
        this.uFabricObj_ = u_fabric_obj_val;
        this.transmitQueueObj_ = new QueueClass();
        this.pendingSessionDataQueueObj_ = new QueueClass();
        this.clearPendingAjaxRequestCommand();
    };

    this.transmitAjaxRequest = (output_val) => {
        if (this.pendingAjaxRequestCommandExist()) {
            console.log("HttpXmtClass.transmitAjaxRequest() enqueue " + output_val);  
            console.log("HttpXmtClass.transmitAjaxRequest() pending_command " + this.pendingAjaxRequestCommand());
            this.transmitQueueObj().enqueueData(output_val);
            return;
        }
        this.xmtAjaxRequest(output_val); 
    };

    this.xmtAjaxRequest = (output_val) => {
        let data = output_val;
        const depth = data.charAt(0);
        const command = data.charAt(1);

        if (command !== FE_DEF.GET_LINK_DATA_COMMAND()) {
            console.log("HttpXmtClass.xmtAjaxRequest() data=" + data);
        }

        if (command === FE_DEF.LOGOUT_COMMAND()) {
            data = this.timeStampsForLogout() + data;
        }
        else if (depth !== "0") {
            if (!UTILS.validValue(this.linkObj().nodeTimeStamp())) {
                console.log("HttpXmtClass.xmtAjaxRequest() data=" + data);
                console.log("HttpXmtClass.xmtAjaxRequest() invalid nodeTimeStamp=" + this.linkObj().nodeTimeStamp());
                abend();
            }
            if (!UTILS.validValue(this.linkObj().fabricTimeStamp())) {
                console.log("HttpXmtClass.xmtAjaxRequest() data=" + data);
                console.log("HttpXmtClass.xmtAjaxRequest() invalid fabricTimeStamp" + this.linkObj().fabricTimeStamp());
                abend();
            }

            data = this.linkObj().nodeTimeStamp() + this.linkObj().fabricTimeStamp() + data;
        }

        if (command !== FE_DEF.GET_LINK_DATA_COMMAND()) {
            console.log("HttpXmtClass.xmtAjaxRequest() data=" + data);
        }

        this.setPendingAjaxRequestCommand(command);
        this.httpReqObj().sendAjaxRequest(data); 
    };

    this.startWatchDog = (link_val) => {
        if (UTILS.validValue(this.watchDogId())) {
            abend();
        }

        const this0 = this;
        this.watchDogId_ = setInterval(function (link_val) {
            if (this0.pendingAjaxRequestCommandExist()) {
                //if (this0.pendingAjaxRequestCommand() !== FE_DEF.GET_LINK_DATA_COMMAND()) {
                    console.log("HttpXmtClass.startWatchDog() request is not transmitted because of pending_command=" + this0.pendingAjaxRequestCommand());
                //}
                return;
            }

            const output = this0.transmitQueueObj().dequeueData();
            if (output) {
                this0.xmtAjaxRequest(output);
                return;
            }

            const session_id = this0.pendingSessionDataQueueObj().dequeueData();
            if (session_id) {
                this0.uFabricObj().getSessionDataRequest(session_id);
                return;
            }
            if (this0.linkObj().serverNameListTag() !== this0.linkObj().nameListTag()) {
                this0.uFabricObj().getNameListRequest(this0.linkObj().nameListTag());
                return;
            }
            this0.uFabricObj().getLinkDataRequest();
        }, 100, link_val);
    };

    this.stopWatchDog = () => {
        if (this.watchDogId() !== null) {
            clearInterval(this.watchDogId());
            this.watchDogId_ = null;
        }
    };

    this.pendingAjaxRequestCommand = () => this.thePendingAjaxRequestCommand;
    this.pendingAjaxRequestCommandExist = () => (this.pendingAjaxRequestCommand() !== FE_DEF.NULL_COMMAND());
    this.clearPendingAjaxRequestCommand = () => {this.thePendingAjaxRequestCommand = FE_DEF.NULL_COMMAND();};

    this.setPendingAjaxRequestCommand = (command_val) => {
        if (this.pendingAjaxRequestCommandExist()) {
            console.log("HttpXmtClass.setPendingAjaxRequestCommand() old=" + this.pendingAjaxRequestCommand() + " new=" + command_val);
            abend();
        }
        this.thePendingAjaxRequestCommand = command_val;
    };

    this.uFabricObj = () => this.uFabricObj_;
    this.rootObj = () => this.uFabricObj().rootObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.httpReqObj = () => this.uFabricObj().httpReqObj();
    this.transmitQueueObj = () => this.transmitQueueObj_;
    this.pendingSessionDataQueueObj = () => this.pendingSessionDataQueueObj_;
    this.watchDogId = () => this.watchDogId_;
    this.timeStampsForLogout = () => this.timeStampsForLogout_;
    this.setTimeStampsForLogout = (val) => {this.timeStampsForLogout_ = val;}
    this.init__(u_fabric_obj_val);
}
