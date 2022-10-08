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

    this.receiveFabricResponse = function(command_val) {
        console.log("GoBasePortObject.receiveFabricResponse()");

        if (command_val === "get_link_data") {
            this.linkObject().sleepMilliseconds(5000);
            this.fabricRequestObject().getLinkDataRequest();
        }

        //window.open("go_play.html", "_self");
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.fabricResponseObject = () => this.rootObject().fabricResponseObject();
    this.init__(root_val);
}
