/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObject_ = root_val;
        this.fabricSessionSetupObject().setCallbackFunc(this.receiveData, this);
    };

    this.transmitData = function(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val) {
        console.log("GoDuetPortObject.transmitData() theme_type_val=" + theme_type_val + " theme_data_val=" + theme_data_val);
        this.fabricRequestObject().sendSetupSessionRequest(theme_type_val, theme_data_val, group_mode_val, second_fiddle_val);
    };

    this.receiveData = function() {
        console.log("GoDuetPortObject.receiveData()");
        window.open("go_play.html", "_self");
    };

    this.rootObject = () => this.rootObject_;
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricSessionSetupObject = () => this.rootObject().fabricSessionSetupObject();
    this.init__(root_val);
}
