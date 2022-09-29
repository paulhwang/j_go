/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    this.init__ = function() {
        this.theLinkObject = new FabricLinkObject();
        this.theHtmlObject = new GoBaseHtmlObject(this);
        this.theFabricObject = new GoBaseFabricObject(this);
    };

    this.linkObject = function() {return this.theLinkObject;};
    this.fabricObject = function() {return this.theFabricObject;};
    this.htmlObject = function() {return this.theHtmlObject;};
    this.init__();
};

var go_base_main = function() {
    "use strict"; new GoBaseRootObject();
};
$(document).ready(go_base_main);
