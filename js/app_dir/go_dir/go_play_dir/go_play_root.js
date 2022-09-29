/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.linkObject().getLinkInfoFromStorage();
        this.linkObject().printLinkInfo();

        this.sessionObject_ = new FabricSessionObject();
        this.sessionObject().getSessionInfoFromStorage();
        this.sessionObject().printSessionInfo();

        this.configObject_ = new GoConfigObject(this);
        this.configObject().decode();
        this.configObject().printConfigInfo();

        this.htmlObject_ = new GoPlayHtmlObject(this);
        this.fabricObject_ = new GoPlayFabricObject(this);
        this.htmlObject_ = new GoPlayHtmlObject(this);
        this.inputObject_ = new GoPlayInputObject(this);
        this.boardObject_ = new GoPlayBoardObject(this);
        this.portObject_ = new GoPlayPortObject(this);
        this.gameObject_ = new GoPlayGameObject(this);
        this.displayObject_ = new GoPlayDisplayObject(this);
    };

    this.configObject = () => this.configObject_;
    this.boardObject = () => this.boardObject_;
    this.portObject = () => this.portObject_;
    this.gameObject = () => this.gameObject_
    this.inputObject = () => this.inputObject_;
    this.displayObject = () => this.displayObject_;
    this.htmlObject = () => this.htmlObject_;
    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.fabricObject = () => this.fabricObject_;
    this.htmlObject = () => this.htmlObject_;
    this.init__();
}

var go_play_main = function() {"use strict"; new GoPlayRootObject();};
$(document).ready(go_play_main);
