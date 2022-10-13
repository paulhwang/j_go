/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);

        this.htmlObject_ = new GoBaseHtmlObject(this);
        this.portObject_ = new GoBasePortObject(this);
    };

    this.fabricBaseObj = () => this.fabricBaseObj_;
    this.dFabricObj = () => this.fabricBaseObj().dFabricObj();
    this.uFabricObj = () => this.fabricBaseObj().uFabricObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.init__();
};

$(document).ready(() => {new GoBaseRootObject();});
