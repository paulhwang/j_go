/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.transmitData = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        console.log("GoSoloPortObject.transmitData() theme_type_val=" + theme_type_val + " theme_data_val=" + theme_data_val);
        this.fabricRequestObject().setupSessionRequest(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val);
    };

    this.receiveFabricResponse = function(command_val) {
        console.log("GoSoloPortObject.receiveFabricResponse() command_val=" + command_val);
        window.open("go_play.html", "_self");
    };

    this.rootObject = () => this.rootObject_;
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.init__(root_val);
}
