/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SignUpRootObject() {
    "use strict";
    this.init__ = function() {
        this.thePhwangObject = new PhwangClass(this);
        this.theFE_DEF = new FE_DEFINE_OBJECT();
        this.phwangObject().initObject();
        this.theAjaxObject = new SignUpAjaxClass(this);
        this.theHtmlObject = new SignUpHtmlObject(this);
        this.debug(true, "init__", this.objectName());
    };

    this.objectName = function() {return "SignUpRootObject";};
    this.FE_DEF = function() {return this.theFE_DEF;};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
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
    this.gotoSignInPage = function() {window.open(this.phwangObject().serverHttpHeader() + "go_login.html", "_self")};

    this.init__ = function(root_object_val) {
        this.theRootObject = root_object_val; this.setupHtmlInput();
    };

    this.setupHtmlInput = function() {
        var this0 = this;
        $(".sign_up_section .sign_up_button").on("click", function() {
            var account_name = $(".sign_up_section .sign_up_account_name").val();
            var password = $(".sign_up_section .sign_up_password").val();
            var email = $(".sign_up_section .sign_up_email").val();
            this0.debug(true, "setupHtmlInput", "account_name=" + account_name + " password=" + password + " email=" + email);
            if (account_name) {
                this0.phwangAjaxObject().signUpRequest(account_name, password, email);
            }
        });
    };

    this.objectName = function() {return "SignUpHtmlObject";};
    this.rootObject = function() {return this.theRootObject;};
    this.phwangObject = function() {return this.rootObject().phwangObject();};
    this.phwangAjaxObject = function() {return this.phwangObject().phwangAjaxObject();};
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

    this.receiveSignUpResponse = function(result_val) {
        this.debug(true, "receiveSignUpResponse", "result_val=" + result_val);
        var data = JSON.parse(result_val);
        if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
            this.debug(true, "receiveSignUpResponse", "succeed");
            this.htmlObject().gotoSignInPage();
        }
        else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            this.debug(true, "receiveSignUpResponse", "account_name_already_exist");
        }
        else {
            this.abend("receiveSignUpResponse", "invalid_result=" + data.result);
        }
    };

    /*
    this.receiveSetupLinkResponse = function(result_val) {};
    this.receiveSetupSessionResponse = function(result_val) {};
    this.receiveSetupSession2Response = function(result_val) {};
    this.receiveSetupSession3Response = function(result_val) {};
    this.receivePutSessionDataResponse = function(result_val) {};
    this.receiveGetSessionDataResponse = function(result_val, data_val) {};
    */

    this.objectName = function() {return "SignUpAjaxClass";};
    this.rootObject = function() {return this.theRootObject;};
    this.FE_DEF = function() {return this.rootObject().FE_DEF();};
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
