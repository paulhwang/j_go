/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricResponseObject().setCallbackFunc(this.receiveData, this);

        this.fabricRequestObject().getLinkDataRequest();
    };

    this.transmitData = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        console.log("GoDuetPortObject.transmitData() theme_type_val=" + theme_type_val + " theme_data_val=" + theme_data_val);
        this.fabricRequestObject().setupSessionRequest(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val);
    };

    this.receiveData = function(command_val) {
        console.log("GoDuetPortObject.receiveData() command_val=" + command_val);

        if (command_val === "get_name_list") {
            this.htmlObject().renderNameList();
        }
        else if (command_val === "setup_session3") {
            window.open("go_play.html", "_self");
        }
        else {
            console.log("GoDuetPortObject.receiveData() bad command_val=" + command_val);
            abend();
        }
    };

    this.rootObject = () => this.rootObject_;
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.htmlObject = () => this.rootObject().htmlObject();
    this.init__(root_val);
}
