/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LoginHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.setupHtmlInput();
        this.debug(true, "init__", "");
    };

    this.setupHtmlInput = function () {
        var this0 = this;
        $(".login_section .login_button").on("click", function() {
            this0.phwangLinkObject().setMyName($(".login_section .login_name").val());
            this0.phwangLinkObject().setPassWord($(".login_section .login_password").val());
            this0.debug(true, "setupHtmlInput", "myName=" + this0.phwangLinkObject().myName() + " passWord=" + this0.phwangLinkObject().passWord());
            if (this0.phwangLinkObject().myName()) {
                this0.phwangAjaxObject().setupLink(this0.phwangLinkObject());
            }
        });
    };

    this.gotoNextPage = function () {
        window.open(this.phwangLinkObject().serverHttpHeader() + "go_config.html", "_self")
    };

    this.objectName = function () {return "LoginHtmlObject";};
    this.rootObject = function () {return this.theRootObject;};
    this.phwangObject = function () {return this.rootObject().phwangObject();};
    this.phwangAjaxObject = function () {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function () {return this.phwangObject().phwangLinkObject();};
    this.ajaxObject = function () {return this.rootObject().ajaxObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {return this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {return this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
