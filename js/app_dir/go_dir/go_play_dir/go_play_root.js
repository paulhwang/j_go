/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObject_ = new FabricResponseObject(this);
        this.fabricRequestObject_ = new FabricRequestObject(this);
        this.fabricSessionPutGetObject_ = new FabricSessionPutGetObject();

        this.configObject_ = new GoConfigObject(this);
        this.configObject().decode();
        this.configObject().printConfigInfo();

        this.htmlObject_      = new GoPlayHtmlObject(this);
        this.uiMouseObject_   = new GoPlayUiMouseObject(this);
        this.boardObject_     = new GoPlayBoardObject(this);
        this.portObject_      = new GoPlayPortObject(this);
        this.gameObject_      = new GoPlayGameObject(this);
        this.uiDisplayObject_ = new GoPlayUiDisplayObject(this);
    };

    this.fabricResponseObject = () => this.fabricResponseObject_;
    this.fabricRequestObject = () => this.fabricRequestObject_;
    this.fabricSessionPutGetObject = () => this.fabricSessionPutGetObject_;
    this.linkObject                = () => this.fabricSessionPutGetObject().linkObject();
    this.sessionObject             = () => this.fabricSessionPutGetObject().sessionObject();

    this.configObject    = () => this.configObject_;
    this.boardObject     = () => this.boardObject_;
    this.portObject      = () => this.portObject_;
    this.gameObject      = () => this.gameObject_
    this.uiMouseObject   = () => this.uiMouseObject_;
    this.uiDisplayObject = () => this.uiDisplayObject_;
    this.htmlObject      = () => this.htmlObject_;

    this.init__();
}

$(document).ready(() => {new GoPlayRootObject();});
