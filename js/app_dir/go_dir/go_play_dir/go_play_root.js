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

/*


        console.log("sessionStorage.peer_name=" + sessionStorage.peer_name);
        this.thePhwangObject = new PhwangClass(this);
        this.thePhwangLinkObject = new PhwangLinkClass(this);
        new PhwangSessionClass(this.phwangLinkObject());
        this.phwangObject().initObject();
        this.phwangLinkObject().getStorageLinkSessionData();
        this.phwangAjaxObject().startWatchDog(this.phwangLinkObject());
        this.theAjaxObject = new GoAjaxClass(this);
        //this.theConfigObject = new GoPlayConfigObject(this);
        //this.theConfigObject.decodeGoConfig();
        //this.theBoardObject = new GoPlayBoardObject(this);
        //this.thePortObject = new GoPlayPortObject(this);
        //this.theGameObject = new GoPlayGameObject(this);
        //this.theHtmlObject = new GoPlayHtmlObject(this);
        //this.theInputObject = new GoPlayInputObject(this);
        //this.theDisplayObject = new GoPlayDisplayObject(this);
        //this.thePhwangSessionObject = this.phwangLinkObject().mallocSessionAndInsert(this.phwangSessionObject().sessionId());
        this.phwangLinkObject().insertSession(this.phwangSessionObject());
        this.phwangSessionObject().setThemeObject(this.portObject());
*/
        this.debug(true, "init__", "myName=" + this.linkObject().myName() + " linkId=" + this.linkObject().linkId() + " sessionId=" + this.sessionObject().sessionId());
        this.debug(true, "init__", "boardSize=" + this.configObject().boardSize() + " myColor=" + this.configObject().myColor() + " komi=" + this.configObject().komiPoint() + " handicap=" + this.configObject().handicapPoint());
    };

    this.objectName = function() {return "GoPlayRootObject";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function() {return this.thePhwangLinkObject;};
    this.phwangSessionObject = function() {return this.phwangLinkObject().phwangSessionObject();};
    this.ajaxObject = function() {return this.theAjaxObject;};
    this.configStorageObject = function() {return this.theConfigStorageObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function(str1_val, str2_val) {
        console.log(str1_val + str2_val);
        //this.phwangObject().LOG_IT(str1_val, str2_val);
    };
    this.abend_ = function(str1_val, str2_val) {
        console.log(str1_val + str2_val);
        this.phwangObject().ABEND(str1_val, str2_val);
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
