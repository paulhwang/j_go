/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObject_ = new FabricResponseObject(this);
        this.fabricRequestObject_ = new FabricRequestObject(this);
        this.fabricSessionSetupObject_ = new FabricSessionSetupObject(this);

        this.htmlObject_ = new GoDuetHtmlObject(this);
        this.portObject_ = new GoDuetPortObject(this);
    };

    this.fabricResponseObject = () => this.fabricResponseObject_;
    this.fabricRequestObject = () => this.fabricRequestObject_;
    this.fabricSessionSetupObject = () => this.fabricSessionSetupObject_;
    this.linkObject = () => this.fabricSessionSetupObject().linkObject();
    this.sessionObject = () => this.fabricSessionSetupObject().sessionObject();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.init__();
};

$(document).ready(() => {new GoDuetRootObject();});
