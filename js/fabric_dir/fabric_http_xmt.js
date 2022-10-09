/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpXmtClass(fab_request_obj_val) {
    "use strict";
    this.init__ = function(fab_request_obj_val) {
        this.fabRequestObj_ = fab_request_obj_val;
        this.transmitQueueObj_ = new QueueClass();
        this.pendingSessionDataQueueObj_ = new QueueClass();
        this.clearPendingAjaxRequestCommand();
    };

    this.transmitAjaxRequest = function(output_val) {
        if (this.pendingAjaxRequestCommandExist()) {
            this.transmitQueueObject().enqueueData(output_val);
            return;
        }
        this.httpServiceObject().sendAjaxRequest(output_val); 
    };

    this.xmtAjaxRequest = function (output_val) {
        var output = JSON.parse(output_val);
        if (output.command !== "get_link_data") {
            console.log("HttpXmtClass.xmtAjaxRequest() output=" + output_val);
        }

        this.setPendingAjaxRequestCommand(output.command);
        this.phwangAjaxEngineObject().sendAjaxRequest(output_val);
    };

    this.startWatchDog = function(link_val) {
        const this0 = this;
        setInterval(function (link_val) {
            if (this0.pendingAjaxRequestCommandExist()) {
                if (this0.pendingAjaxRequestCommand() !== "get_link_data") {
                    console.log("HttpXmtClass.startWatchDog() request is not transmitted because of pending_command=" + ajax_object.pendingAjaxRequestCommand());
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
            /*
            if (link_val.serverNameListTag() > link_val.nameListTag()) {
                this0.getNameList(link_val);
                return;
            }
            this0.getLinkData(link_val);
            */
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

    this.fabRequestObj = () => this.fabRequestObj_;
    this.httpServiceObject = () => this.fabRequestObj().httpServiceObject();
    this.transmitQueueObj = () => this.transmitQueueObj_;
    this.pendingSessionDataQueueObj = () => this.pendingSessionDataQueueObj_;
    this.init__(fab_request_obj_val);
}
