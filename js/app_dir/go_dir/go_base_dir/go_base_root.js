/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObject_ = new DFabricObject(this);
        this.fabricRequestObject_ = new UFabricObject(this);

        this.htmlObject_ = new GoBaseHtmlObject(this);
        this.portObject_ = new GoBasePortObject(this);
    };

    this.fabricResponseObject = () => this.fabricResponseObject_;
    this.fabricRequestObject = () => this.fabricRequestObject_;
    this.linkObject = () => this.fabricRequestObject().linkObj();
    this.sessionObject = () => this.fabricRequestObject().sessionObj();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.init__();
};

$(document).ready(() => {new GoBaseRootObject();});
