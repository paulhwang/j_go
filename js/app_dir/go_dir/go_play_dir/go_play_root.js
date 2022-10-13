/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);

        this.configObject_ = new GoConfigObject(this);
        this.configObject().decode();
        this.configObject().printConfigInfo();

        this.htmlObject_ = new GoPlayHtmlObject(this);
        this.uiMouseObject_ = new GoPlayUiMouseObject(this);
        this.boardObject_ = new GoPlayBoardObject(this);
        this.portObject_ = new GoPlayPortObject(this);
        this.gameObject_ = new GoPlayGameObject(this);
        this.uiDisplayObject_ = new GoPlayUiDisplayObject(this);
    };

    this.fabricBaseObj = () => this.fabricBaseObj_;
    this.dFabricObj = () => this.fabricBaseObj().dFabricObj();
    this.uFabricObj = () => this.fabricBaseObj().uFabricObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.configObject = () => this.configObject_;
    this.boardObject = () => this.boardObject_;
    this.portObject = () => this.portObject_;
    this.gameObject = () => this.gameObject_
    this.uiMouseObject = () => this.uiMouseObject_;
    this.uiDisplayObject = () => this.uiDisplayObject_;
    this.htmlObject = () => this.htmlObject_;

    this.init__();
}

$(document).ready(() => {new GoPlayRootObject();});
