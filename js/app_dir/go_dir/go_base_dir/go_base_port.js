/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBasePortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);

        this.fabricRequestObject().getLinkDataRequest();
    };

    this.receiveFabricResponse = function(command_val, data_val) {
        console.log("GoBasePortObject.receiveFabricResponse()");

        if (command_val === "get_link_data") {
            this.getLinkDataResponse(data_val);
        }

        //window.open("go_play.html", "_self");
    };

    this.getLinkDataResponse = function (data_val) {
        console.log("GoBasePortObject.getLinkDataResponse() data_val.pending_session2=" + data_val.pending_session2);
        if (data_val.pending_session2 != "N/A") {
            console.log("=====================FabricResponseObject.getLinkDataResponse(pending_session2)");
            const pending_session2 = data_val.pending_session2;
            const session_id = pending_session2.slice(0, 8);
            const theme_data = pending_session2.slice(8);

            this.fabricRequestObject().setupSession2Request(session_id);
            //window.open("go_play.html", "_self");
        }
        else {
            this.linkObject().sleepMilliseconds(5000);
            this.fabricRequestObject().getLinkDataRequest();
        }
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.init__(root_val);
}
