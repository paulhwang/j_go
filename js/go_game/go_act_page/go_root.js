/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.phwangAjaxObject().getLinkData(this.phwangLinkObject());

        this.theRAjaxObject = new RAjaxObject(this);
        this.theConfigStorageObject = new GoConfigStorageObject();
        this.theHtmlObject = new GoPlayHtmlObject(this);
        this.theConfigObject = new GoPlayConfigObject(this, this.configStorageObject().configInJson(), true);
        this.theBoardObject = new GoPlayBoardObject(this);
        this.thePortObject = new GoPlayPortObject(this);
        this.theGameObject = new GoPlayGameObject(this);
        this.theInputObject = new GoPlayInputObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);

        this.thePhwangSessionObject = this.phwangLinkObject().mallocSessionAndInsert(this.phwangSessionStorageObject().sessionId());
        this.phwangLinkObject().insertSession(this.phwangSessionObject());
        this.phwangSessionObject().setTopicObject(this.portObject());

        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId() + " sessionId=" + this.phwangSessionStorageObject().sessionId());
        this.debug(true, "init__", "boardSize=" + this.configStorageObject().boardSize() + " stoneColor=" + this.configStorageObject().stoneColor() + " komi=" + this.configStorageObject().komi() + " handicap=" + this.configStorageObject().handicap());
    };

    this.objectName = function () {
        return "GoPlayRootObject";
    };

    this.phwangObject = function () {
        return this.thePhwangObject;
    };

    this.phwangAjaxObject = function () {
        return this.phwangObject().phwangAjaxObject();
    };

    this.phwangLinkObject = function () {
        return this.phwangObject().phwangLinkObject();
    };

    this.phwangSessionObject = function () {
        return this.thePhwangSessionObject;
    };

    this.phwangSessionStorageObject = function () {
        return this.phwangObject().phwangSessionStorageObject();
    };

    this.configStorageObject = function () {
        return this.theConfigStorageObject;
    };

    this.inputObject = function () {
        return this.theInputObject;
    };

    this.displayObject = function () {
        return this.theDisplayObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.rAjaxObject = function () {
        return this.theRAjaxObject;
    };

    this.configObject = function () {
        return this.theConfigObject;
    };

    this.boardObject = function () {
        return this.theBoardObject;
    };

    this.gameObject = function () {
        return this.theGameObject;
    };

    this.portObject = function () {
        return this.thePortObject;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__();
}

