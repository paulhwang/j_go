/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";

    this.init__ = function () {
        this.thePhwangObject = new PhwangClass(this);
        this.phwangObject().initObject();
        this.phwangAjaxObject().startWatchDog(this.phwangLinkObject());
        this.theAjaxObject = new GoAjaxClass(this);
        this.theConfigStorageObject = new GoConfigStorageObject(this);

        this.logit("init__", "============" + this.configStorageObject().encodedGoConfig());

        this.theConfigObject = new GoPlayConfigObject(this, this.configStorageObject().configInJson(), true);
        this.theHtmlObject = new GoPlayHtmlObject(this);
        this.theBoardObject = new GoPlayBoardObject(this);
        this.thePortObject = new GoPlayPortObject(this);
        this.theGameObject = new GoPlayGameObject(this);
        this.theInputObject = new GoPlayInputObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);
        this.thePhwangSessionObject = this.phwangLinkObject().mallocSessionAndInsert(this.phwangSessionObject().sessionId());
        this.phwangLinkObject().insertSession(this.phwangSessionObject());

        this.configObject().setMyColor_(Number(this.configStorageObject().configInputData()));

        this.phwangSessionObject().setTopicObject(this.portObject());
        this.debug(true, "init__", "myName=" + this.phwangLinkObject().myName() + " linkId=" + this.phwangLinkObject().linkId() + " sessionId=" + this.phwangSessionObject().sessionId());
        this.debug(true, "init__", "boardSize=" + this.configStorageObject().boardSize() + " stoneColor=" + this.configStorageObject().stoneColor() + " komi=" + this.configStorageObject().komi() + " handicap=" + this.configStorageObject().handicap());
    };

    this.objectName = function () {return "GoPlayRootObject";};
    this.phwangObject = function () {return this.thePhwangObject;};
    this.phwangAjaxObject = function () {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function () {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function () {return this.phwangObject().phwangSessionObject();};
    this.ajaxObject = function () {return this.theAjaxObject;};
    this.htmlObject = function () {return this.theHtmlObject;};
    this.configStorageObject = function () {return this.theConfigStorageObject;};
    this.inputObject = function () {return this.theInputObject;};
    this.displayObject = function () {return this.theDisplayObject;};
    this.configObject = function () {return this.theConfigObject;};
    this.boardObject = function () {return this.theBoardObject;};
    this.gameObject = function () {return this.theGameObject;};
    this.portObject = function () {return this.thePortObject;};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function (str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function (str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}
