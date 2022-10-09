/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBasePortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.receiveFabricResponse = function(command_val, data_val) {
        if (command_val !== "get_link_data") {
            console.log("GoBasePortObject.receiveFabricResponse() command=" + command_val + " data=" + data_val);
        }

        //else if (command_val === "get_link_data") {} else {console.log("bad command"); abend();}
        if (command_val === "get_link_data") {} else if (command_val === "get_name_list") {} else {console.log("bad command"); abend();}

    };

    this.getLinkDataResponse = function (data_val) {
        if (data_val.pending_session2 != "N/A") {
            console.log("GoBasePortObject.getLinkDataResponse() data_val.pending_session2=" + data_val.pending_session2);
            const pending_session2 = data_val.pending_session2;
            const session_id = pending_session2.slice(0, 8);
            const theme_type = pending_session2.charAt(8)
            const theme_data = pending_session2.slice(9);

            this.fabricRequestObject().setupSession2Request(session_id);
        }
        else if (data_val.pending_session3 != "N/A") {
            console.log("GoBasePortObject.getLinkDataResponse() data_val.pending_session3=" + data_val.pending_session3);
            const pending_session3 = data_val.pending_session3;
            const session_id = pending_session3.slice(0, 8);
            const theme_type = pending_session3.charAt(8)
            const theme_data = pending_session3.slice(9);

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
