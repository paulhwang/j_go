/*
  Copyrights reserved
  Written by Paul Hwang
*/
function SignUpRootObject() {
    "use strict";
    this.init__ = function() {
        this.thePhwangObject = new PhwangClass(this);
        this.thePhwangLinkObject = new PhwangLinkClass(this);
        this.phwangObject().initObject();
        this.theAjaxObject = new SignUpAjaxClass(this);
        this.theHtmlObject = new SignUpHtmlObject(this);
        this.debug(true, "init__", this.objectName());
    };

    this.objectName = function() {return "SignUpRootObject";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function() {return this.thePhwangLinkObject;};
    this.phwangSessionObject = function() {return this.phwangLinkObject().phwangSessionObject();};
    this.htmlObject = function() {return this.theHtmlObject;};
    this.ajaxObject = function() {return this.theAjaxObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.abend_(this.objectName() + "." + str1_val, str2_val);};
    this.logit_ = function(str1_val, str2_val) {this.phwangObject().LOG_IT(str1_val, str2_val);};
    this.abend_ = function(str1_val, str2_val) {this.phwangObject().ABEND(str1_val, str2_val);};
    this.init__();
}

function SignUpHtmlObject(root_object_val) {
    "use strict";
    this.gotoGoConfigPage = function() {window.open(this.phwangObject().serverHttpHeader() + "go_config.html", "_self")};
    this.gotoSignUpPage = function() {window.open(this.phwangObject().serverHttpHeader() + "sign_up.html", "_self")};
    this.init__ = function(root_object_val) {this.theRootObject = root_object_val; this.setupHtmlInput();};
    this.setupHtmlInput = function() {
        var this0 = this;
        $(".login_section .login_button").on("click", function() {
            this0.phwangLinkObject().setMyName($(".login_section .login_name").val());
            var password = $(".login_section .login_password").val();
            this0.debug(true, "setupHtmlInput", "myName=" + this0.phwangLinkObject().myName() + " password=" + password);
            if (this0.phwangLinkObject().myName()) {
                this0.phwangAjaxObject().setupLink(this0.phwangLinkObject(), password);
            }
        });
    };

    this.objectName = function() {return "SignUpHtmlObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function() {return this.rootObject().phwangLinkObject();};
    this.ajaxObject = function() {return this.rootObject().ajaxObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}

function SignUpAjaxClass(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.theRootObject = root_object_val;
    };

    this.receiveSetupLinkResponse = function(result_val) {
        this.debug(true, "receiveSetupLinkResponse", "result_val=" + result_val);
        var data = JSON.parse(result_val);
        if (data.result === "succeed") {
            this.debug(false, "receiveSetupLinkResponse", "succeed");
            this.phwangLinkObject().setTimeStamp(data.time_stamp);
            this.phwangLinkObject().setLinkId(data.link_id);
            this.phwangObject().putStorageLinkData();
            this.htmlObject().gotoGoConfigPage();
        }
        else if (data.result === "password not match") {
            this.debug(true, "receiveSetupLinkResponse", "password not match");

        }
        else if (data.result === "name not found") {
            this.debug(true, "receiveSetupLinkResponse", "name not found");
            this.htmlObject().gotoSignUpPage();
        }
        else {
            this.abend("receiveSetupLinkResponse", "bad result" + data.result);
        }
    };

    this.receiveGetNameListResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function(result_val) {};
    this.receiveGetSessionDataResponse = function(result_val, data_val) {};
    this.objectName = function() {return "SignUpAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.phwangLinkObject = function() {return this.rootObject().phwangLinkObject();};
    this.htmlObject = function() {return this.rootObject().htmlObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}

var sign_up_main = function() {"use strict"; new SignUpRootObject();};
$(document).ready(sign_up_main);
