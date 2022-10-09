/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpXmtClass(fab_request_obj_val) {
    "use strict";
    this.init__ = function(fab_request_obj_val) {
        this.fabRequestObj_ = fab_request_obj_val;
        this.theTransmitQueueObject = new QueueClass();
        this.thePendingSessionDataQueueObject = new QueueClass();
        this.clearPendingAjaxRequestCommand();
    };

    this.transmitAjaxRequest = function(output_val) {
        /*
        if (this.pendingAjaxRequestCommandExist()) {
            this.transmitQueueObject().enqueueData(output_val);
            return;
        }
        */
        //this.xmtAjaxRequest(output_val);
        this.httpServiceObject().sendAjaxRequest(output_val); 
    };

    this.xmtAjaxRequest = function (output_val) {
        /*
        var output = JSON.parse(output_val);
        if (output.command !== this.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND()) {
            this.debug(true, "xmtAjaxRequest", "output=" + output_val);
        }
        */
        //this.setPendingAjaxRequestCommand(output.command);
        this.phwangAjaxEngineObject().sendAjaxRequest(output_val);
    };

    this.startWatchDog = function(link_val) {
        setInterval(function (link_val) {
            /*
            var ajax_object = link_val.phwangAjaxObject();
            if (ajax_object.pendingAjaxRequestCommandExist()) {
                if (ajax_object.pendingAjaxRequestCommand() !== ajax_object.phwangAjaxProtocolObject().GET_LINK_DATA_COMMAND()) {
                    link_val.debug(false, "PhwangAjaxClassWatchDog", ajax_object.pendingAjaxRequestCommand() + " is pending");
                }
                return;
            }
            var output = ajax_object.transmitQueueObject().dequeueData();
            if (output) {
                ajax_object.xmtAjaxRequest(output);
                return;
            }
            var link_session_id = ajax_object.pendingSessionDataQueueObject().dequeueData();
            if (link_session_id) {
                ajax_object.getSessionData(link_val, link_session_id);
                return;
            }
            if (link_val.serverNameListTag() > link_val.nameListTag()) {
                ajax_object.getNameList(link_val);
                return;
            }
            ajax_object.getLinkData(link_val);
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
    this.init__(fab_request_obj_val);
}
