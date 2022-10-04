/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    "use strict";
    this.init__ = function() {

        this.fabricSessionSetupObject_ = new FabricSessionSetupObject(this);
        this.htmlObject_ = new GoBaseHtmlObject(this);
    };

    this.fabricSessionSetupObject = () => this.fabricSessionSetupObject_;
    this.linkObject = () => this.fabricSessionSetupObject().linkObject();
    this.sessionObject = () => this.fabricSessionSetupObject().sessionObject_;
    this.htmlObject = () => this.htmlObject_;
    this.init__();
};

$(document).ready(() => {new GoBaseRootObject();});
