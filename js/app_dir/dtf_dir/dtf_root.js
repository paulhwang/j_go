/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfRootObject() {
    "use strict";
    this.init__ = function() {
        console.log("DtfRootObject.init__(!!!!!!!!!!!!)");
        this.fabricBaseObj_ = new FabricBaseObject(this);

        this.portObj_ = new DtfPortObject(this);
        this.htmlObj_ = new DtfHtmlObject(this);
    };

    this.fabricBaseObj = () => this.fabricBaseObj_;
    this.dFabricObj = () => this.fabricBaseObj().dFabricObj();
    this.uFabricObj = () => this.fabricBaseObj().uFabricObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.htmlObj = () => this.htmlObj_;
    this.portObj = () => this.portObj_;
    this.init__();
};

$(document).ready(() => {new DtfRootObject();});
