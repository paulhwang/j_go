/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.sessionObject_ = new FabricSessionObject();
        this.htmlObject_ = new GoBaseHtmlObject(this);
        this.fabricObject_ = new GoBaseFabricObject(this);
    };

    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.fabricObject = () => this.fabricObject_;
    this.htmlObject = () => this.htmlObject_;
    this.linkId = () => this.linkObject().linkId();
    this.myName = () => this.linkObject().myName();
    this.timeStamp = () => this.linkObject().timeStamp();
    this.init__();
};

var go_base_main = function() {"use strict"; new GoBaseRootObject();};
$(document).ready(go_base_main);
