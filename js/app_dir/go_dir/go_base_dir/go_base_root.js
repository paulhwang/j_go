/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.htmlObject_ = new GoBaseHtmlObject(this);
        this.fabricObject_ = new GoBaseFabricObject(this);
    };

    this.linkObject = function() {return this.linkObject_;};
    this.fabricObject = function() {return this.fabricObject_;};
    this.htmlObject = function() {return this.htmlObject_;};
    this.linkId = function() {return this.linkObject().linkId();};
    this.myName = function() {return this.linkObject().myName();};
    this.timeStamp = function() {return this.linkObject().timeStamp();};
    this.init__();
};

var go_base_main = function() {"use strict"; new GoBaseRootObject();};
$(document).ready(go_base_main);
