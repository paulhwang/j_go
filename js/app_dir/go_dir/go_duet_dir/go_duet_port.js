/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObj_ = root_val;
        this.fabricResponseObj().setCallbackFunc(this.receiveFabricResponse, this);
    };


    this.receiveFabricResponse = function(command_val, data_val) {
        if (command_val !== "get_link_data") {
            console.log("GoPlayPortObject.receiveFabricResponse() command=" + command_val + " data=" + data_val);
        }

        if (command_val === "get_link_data") {
            if (data_val.pending_session3 != "N/A") {
                console.log("GoDuetPortObject.getLinkDataResponse() data_val.pending_session3=" + data_val.pending_session3);
                const pending_session3 = data_val.pending_session3;
                const session_id = pending_session3.slice(0, 8);
                const theme_type = pending_session3.charAt(8)
                const theme_data = pending_session3.slice(9);
            }
        }

        else if (command_val === "get_name_list") {
            this.htmlObj().renderNameList();
        }

        else if (command_val === "setup_session3") {
            window.open("go_play.html", "_self");
        }

        else if (command_val === "get_link_data") {} else if (command_val === "get_name_list") {} else {console.log("bad command"); abend();}
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().linkObject();
    this.fabricRequestObj = () => this.rootObj().fabricRequestObject();
    this.fabricResponseObj = () => this.rootObj().fabricResponseObject();
    this.htmlObj = () => this.rootObj().htmlObject();
    this.init__(root_val);
}
