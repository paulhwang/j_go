/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    "use strict";
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.linkObject().getLinkInfoFromStorage();
        this.sessionObject_ = new FabricSessionObject();
        this.htmlObject_ = new GoBaseHtmlObject(this);
        this.fabricSessionSetupObject_ = new FabricSessionSetupObject(this);
    };

    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.fabricSessionSetupObject = () => this.fabricSessionSetupObject_;
    this.htmlObject = () => this.htmlObject_;
    this.init__();
};

var go_base_main = function() {"use strict"; new GoBaseRootObject();};
$(document).ready(() => {new GoBaseRootObject();});
