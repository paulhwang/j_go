/*
  Copyrights reserved
  Written by Paul Hwang
*/
function MmwRootActObject() {
    "use strict";
    this.init__ = function() {
        window.console.log("aaaaa1");
        this.thePhwangObject = new PhwangClass(this);
        window.console.log("aaaaa2");
        this.phwangObject().initObject();
        window.console.log("aaaaa3");
        this.debug(true, "init__", this.objectName());
        this.theAjaxObject = new mmwAjaxClass(this);
        this.theHtmlObject = new mmwHtmlObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);
        this.phwangAjaxObject().mmwReadDataRequest("read", "");
        //this.phwangAjaxObject().triggerGetMmwData();
        this.debug(true, "init__", this.objectName());
    };

    this.objectName = function() {return "MmwRootActObject";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.htmlObject = function() {return this.theHtmlObject;};
    this.ajaxObject = function() {return this.theAjaxObject;};
    this.displayObject = function() {return this.theDisplayObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function(str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function(str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}

function mmwHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theCoordWidth = 300;
        this.theCoordSize = 10;
        this.theCoordGap = 30;
        this.initElements();
        this.setupHtmlInput();
        this.debug(true, "init__", "");
    };

    this.initElements = function() {
        this.theCanvasElement = window.document.getElementById("go_canvas");
        if (this.canvasElement() === null) {
            this.abend("GoUiObject", "null canvasElement");
            return;
        }
        this.canvasElement().setAttribute("style", "border:1px solid #000000;");
        this.canvasElement().width = this.coordWidth() * 3 + this.coordGap() * 2;
        this.canvasElement().height = this.coordWidth() * 1.05;
        this.theCanvasContext = this.canvasElement().getContext("2d");
        if (this.canvasContext() === null) {
            this.abend("GoUiObject", "null canvasContext");
            return;
        }
        this.theBlackScoreElement = window.document.getElementById("black_score");
        if (this.blackScoreElement() === null) {
            this.abend("GoUiObject", "null theBlackScoreElement");
            return;
        }
        this.theWhiteScoreElement = window.document.getElementById("white_score");
        if (this.whiteScoreElement() === null) {
            this.abend("GoUiObject", "null theWhiteScoreElement");
            return;
        }
    };

    this.setupHtmlInput = function(str1_val, str2_val) {
        var this0 = this;
        $("canvas").on("click", function(event) {
            this0.inputObject().uiClick(event.clientX, event.clientY);
        });
        $("canvas").on("mousemove", function(event) {
            this0.inputObject().uiMouseMove(event.clientX, event.clientY);
        });
    };

    this.objectName = function() {return "GoPlayHtmlObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.configObject = function() {return this.rootObject().configObject();};
    this.ajaxObject = function() {return this.rootObject().ajaxObject();};
    this.inputObject = function() {return this.rootObject().inputObject();};
    this.renderNameListFuncExist = function() {return false;};
    this.coordWidth = function() {return this.theCoordWidth;};
    this.coordSize = function() {return this.theCoordSize;};
    this.coordGap = function() {return this.theCoordGap;}
    this.canvasElement = function() {return this.theCanvasElement;};
    this.canvasContext = function() {return this.theCanvasContext;};
    this.blackScoreElement = function() {return this.theBlackScoreElement;};
    this.whiteScoreElement = function() {return this.theWhiteScoreElement;};
    this.getGridLength = function() {return this.coordWidth() / 10;};
    //this.getGridLength = function() {return this.canvasElement().width / (this.configObject().boardSize() + 1);};
    this.getArrowUnitLength = function() {return this.canvasElement().width / 20;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
};

function mmwAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {this.theRootObject = root_object_val;};

    this.receiveMmwReadDataResponse = function(json_response_val) {
        this.debug(true, "receiveMmwReadDataResponse", "json_response_val=" + json_response_val);
        var response = JSON.parse(json_response_val);
        if (response.result === "succeed") {
            this.debug(true, "receiveMmwReadDataResponse", "succeed, data=" + response.data);

            //this.phwangAjaxObject().mmwReadDataRequest("read", "");
        }
        else {
            this.abend("receiveMmwReadDataResponse", "bad result" + response.result);
        }
    };

    this.receiveGetNameListResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function(result_val) {};
    this.receiveGetSessionDataResponse = function(result_val, data_val) {};
    this.objectName = function() {return "mmwAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
};

var mmw_act_main = function() {
    "use strict";
    new MmwRootActObject();
};

$(document).ready(mmw_act_main);
