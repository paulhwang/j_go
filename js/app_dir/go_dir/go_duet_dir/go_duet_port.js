/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);

        this.fabricRequestObject().getLinkDataRequest();
    };


    this.receiveFabricResponse = function(command_val, data_val) {
        if (command_val !== "get_link_data") {
            console.log("GoDuetPortObject.receiveFabricResponse() command_val=" + command_val);
        }

        if (command_val === "get_link_data") {
            this.getLinkDataResponse(data_val);
        }
        else if (command_val === "get_name_list") {
            this.getNameListResponse(data_val);
        }
        else if (command_val === "setup_session3") {
            this.setupSession3Response(data_val);
        }
        else {
            console.log("GoDuetPortObject.receiveFabricResponse() bad command_val=" + command_val);
            abend();
        }
    };

    this.getLinkDataResponse = function (data_val) {
        if (data_val.pending_session3 != "N/A") {
            console.log("GoDuetPortObject.getLinkDataResponse() data_val.pending_session3=" + data_val.pending_session3);
            const pending_session3 = data_val.pending_session3;
            const session_id = pending_session3.slice(0, 8);
            const theme_type = pending_session3.charAt(8)
            const theme_data = pending_session3.slice(9);

            //window.open("go_play.html", "_self");
        }

        if (this.linkObject().nameListUpdateNeeded()) {
            this.fabricRequestObject().getNameListRequest(this.linkObject().nameListTag());
        }

        this.linkObject().sleepMilliseconds(5000);
        this.fabricRequestObject().getLinkDataRequest();
    };

    this.getNameListResponse = function (data_val) {
        console.log("GoDuetPortObject.getNameListResponse()");
        this.htmlObject().renderNameList();
    };

    this.setupSession3Response = function (data_val) {
        window.open("go_play.html", "_self");
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.htmlObject = () => this.rootObject().htmlObject();
    this.init__(root_val);
}
