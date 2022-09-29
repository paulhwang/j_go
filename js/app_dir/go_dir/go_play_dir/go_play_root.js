/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.linkObject().getLinkInfoFromStorage();
        this.sessionObject_ = new FabricSessionObject();
        this.sessionObject().getSessionInfoFromStorage();


        this.theConfigObject = new GoPlayConfigObject(this);
        this.theConfigObject.decodeGoConfig();
        this.htmlObject_ = new GoPlayHtmlObject(this);
        this.fabricObject_ = new GoPlayFabricObject(this);
        this.theHtmlObject = new GoPlayHtmlObject(this);
        this.theInputObject = new GoPlayInputObject(this);
        this.theBoardObject = new GoPlayBoardObject(this);
        this.thePortObject = new GoPlayPortObject(this);
        this.theGameObject = new GoPlayGameObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);

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


    this.configObject = function() {return this.theConfigObject;};
    this.boardObject = function() {return this.theBoardObject;};
    this.portObject = function() {return this.thePortObject;};
    this.gameObject = function() {return this.theGameObject;};
    this.inputObject = function() {return this.theInputObject;};
    this.displayObject = function() {return this.theDisplayObject;};
    this.htmlObject = function() {return this.theHtmlObject;};


    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.fabricObject = () => this.fabricObject_;
    this.htmlObject = () => this.htmlObject_;
    this.init__();
}

function GoAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function (root_object_val) {this.theRootObject = root_object_val;};
    this.receiveSetupLinkResponse = function(result_val) {};
    this.receiveGetNameListResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function (result_val) {};
    this.receiveGetSessionDataResponse = function (result_val, data_val) {};
    this.objectName = function() {return "GoAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}

var go_play_main = function() {"use strict"; new GoPlayRootObject();};
$(document).ready(go_play_main);
