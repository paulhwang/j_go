/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpXmtClass(u_fabric_obj_val) {
    "use strict";
    this.init__ = function(u_fabric_obj_val) {
        this.uFabricObj_ = u_fabric_obj_val;
        this.transmitQueueObj_ = new QueueClass();
        this.pendingSessionDataQueueObj_ = new QueueClass();
        this.clearPendingAjaxRequestCommand();
    };

    this.transmitAjaxRequest = function(output_val) {
        if (this.pendingAjaxRequestCommandExist()) {
            console.log("HttpXmtClass.transmitAjaxRequest() enqueue " + output_val);  
            console.log("HttpXmtClass.transmitAjaxRequest() pending_command " + this.pendingAjaxRequestCommand());
            this.transmitQueueObj().enqueueData(output_val);
            return;
        }
        this.xmtAjaxRequest(output_val); 
    };

    this.xmtAjaxRequest = function (output_val) {
        let data = output_val;
        const command = data.charAt(1);

        if ((command !== 'R') && (command !== "I")) {
            data = this.linkObj().nodeTimeStamp() + this.linkObj().fabricTimeStamp() + data;
        }

        if (command !== 'D') {
            console.log("HttpXmtClass.xmtAjaxRequest() data=" + data);
        }

        this.setPendingAjaxRequestCommand(command);
        this.httpReqObj().sendAjaxRequest(data); 
    };

    this.startWatchDog = function(link_val) {
        const this0 = this;
        setInterval(function (link_val) {
            if (this0.pendingAjaxRequestCommandExist()) {
                if (this0.pendingAjaxRequestCommand() !== "get_link_data") {
                    console.log("HttpXmtClass.startWatchDog() request is not transmitted because of pending_command=" + this0.pendingAjaxRequestCommand());
                }
                return;
            }

            const output = this0.transmitQueueObj().dequeueData();
            if (output) {
                this0.xmtAjaxRequest(output);
                return;
            }

            const link_session_id = this0.pendingSessionDataQueueObj().dequeueData();
            if (link_session_id) {
                //this0.getSessionData(link_val, link_session_id);
                //return;
            }
            if (this0.linkObj().serverNameListTag() !== this0.linkObj().nameListTag()) {
                this0.uFabricObj().getNameListRequest(this0.linkObj().nameListTag());
                return;
            }
            this0.uFabricObj().getLinkDataRequest();
        }, 100, link_val);
    };

    this.pendingAjaxRequestCommand = () => this.thePendingAjaxRequestCommand;
    this.pendingAjaxRequestCommandExist = () => (this.pendingAjaxRequestCommand() !== "");

    this.clearPendingAjaxRequestCommand = function() {
        this.thePendingAjaxRequestCommand = "";
    };

    this.setPendingAjaxRequestCommand = function (command_val) {
        if (this.pendingAjaxRequestCommand()) {
            console.log("HttpXmtClass.setPendingAjaxRequestCommand() old=" + this.pendingAjaxRequestCommand() + " new=" + command_val);
            abend();
        }
        this.thePendingAjaxRequestCommand = command_val;
    };

    this.uFabricObj = () => this.uFabricObj_;
    this.linkObj = () => this.uFabricObj().linkObj();
    this.httpReqObj = () => this.uFabricObj().httpReqObj();
    this.transmitQueueObj = () => this.transmitQueueObj_;
    this.pendingSessionDataQueueObj = () => this.pendingSessionDataQueueObj_;
    this.init__(u_fabric_obj_val);
}
