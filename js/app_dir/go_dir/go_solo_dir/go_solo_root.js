/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricSessionSetupObject_ = new FabricSessionSetupObject(this);

        this.htmlObject_ = new GoSoloHtmlObject(this);
        this.portObject_ = new GoSoloPortObject(this);
    };

    this.fabricSessionSetupObject = () => this.fabricSessionSetupObject_;
    this.linkObject = () => this.fabricSessionSetupObject().linkObject();
    this.sessionObject = () => this.fabricSessionSetupObject().sessionObject();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.init__();
};

$(document).ready(() => {new GoSoloRootObject();});
