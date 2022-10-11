/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoEnsembleRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObject_ = new FabricResponseObject(this);
        this.fabricRequestObject_ = new FabricRequestObject(this);
        this.configObject_ = new GoConfigObject(this);

        this.htmlObject_ = new GoEnsembleHtmlObject(this);
        this.portObject_ = new GoEnsemblePortObject(this);
    };

    this.fabricResponseObject = () => this.fabricResponseObject_;
    this.fabricRequestObject = () => this.fabricRequestObject_;
    this.linkObject = () => this.fabricRequestObject().linkObject();
    this.sessionObject = () => this.fabricRequestObject().sessionObject();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.configObject = () => this.configObject_;
    this.init__();
};

$(document).ready(() => {new GoEnsembleRootObject();});
