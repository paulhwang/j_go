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

    this.receiveFabricResponse = function() {
        console.log("GoPlayPortObject.receiveFabricResponse()");
        window.open("go_play.html", "_self");
    };

    this.rootObject = () => this.rootObject_;
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.init__(root_val);
}
