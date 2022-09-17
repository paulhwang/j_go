/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SignUpRootObject() {
    "use strict";
    this.ajaxRoute = function() {return "/django_go/go_ajax/";};
    this.jsonContext = function() {return "application/json; charset=utf-8";}
    this.plainTextContext = function() {return "text/plain; charset=utf-8";}

    this.init__ = function() {
        this.theFE_DEF = new FE_DEFINE_OBJECT();
        this.thePhwangAjaxStorageObject = new PhwangAjaxStorageObject(this);

        this.theHttpGetRequest = new XMLHttpRequest();
        this.startAjaxWaiting();

        this.bindHtmlInput();
    };

    this.bindHtmlInput = function() {
        var this0 = this;
        $(".sign_up_section .sign_up_button").on("click", function() {
            var account_name = $(".sign_up_section .sign_up_account_name").val();
            var password = $(".sign_up_section .sign_up_password").val();
            var email = $(".sign_up_section .sign_up_email").val();
            if (account_name) {
                var output = JSON.stringify({
                        command: "sign_up",
                        packet_id: this0.ajaxPacketId(),
                        my_name: account_name,
                        password: password,
                        email: email,
                        });
                console.log("signUpRequest=" + output);

                this0.sendAjaxRequest(output);
            }
        });
    };

    this.sendAjaxRequest = function(output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("phwangajaxrequest", output_val);
        this.httpGetRequest().setRequestHeader("phwangajaxpacketid", this.ajaxPacketId());
        this.incrementAjaxPacketId();
        this.httpGetRequest().send(null);
    };

    this.startAjaxWaiting = function() {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.examineResponse(this0.httpGetRequest().responseText);
            }
        };
    };

    this.examineResponse = function(json_response_val) {
        console.log("json_response_val=" + json_response_val);

        var response = JSON.parse(json_response_val);
        console.log("response.data=" + response.data);

        var data = JSON.parse(response.data);
        if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
            console.log("succeed");
            this.gotoSignInPage();
        }
        else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };

    this.gotoSignInPage = function() {
        //window.open(this.phwangObject().serverHttpHeader() + "sign_in.html", "_self")
        window.open("go_login.html", "_self")
    };

    this.FE_DEF = function() {return this.theFE_DEF;};
    this.httpGetRequest = function() {return this.theHttpGetRequest;};
    this.ajaxPacketId = function() {return this.phwangAjaxObject().ajaxPacketId();};
    this.phwangAjaxStorageObject = function() {return this.thePhwangAjaxStorageObject;};
    this.ajaxPacketId = function() {return this.phwangAjaxStorageObject().ajaxPacketId();};
    this.incrementAjaxPacketId = function() {this.phwangAjaxStorageObject().incrementAjaxPacketId();};
    this.init__();
}

function PhwangAjaxStorageObject(phwang_ajax_object_val) {
    "use strict";
    this.storage = function() {return sessionStorage;};
    this.init__ = function (phwang_ajax_object_val) {
        this.thePhwangAjaxObject = phwang_ajax_object_val;
        this.resetAjaxStorage();
    };

    this.resetAjaxStorage = function() {
        this.resetAjaxPacketId();
    };

    this.resetAjaxPacketId = function() {if (this.ajaxPacketId() === undefined) {
        this.storage().ajax_packet_id = 0;}
    };
    this.ajaxPacketId = function() {return this.storage().ajax_packet_id;};
    this.incrementAjaxPacketId = function() {
        var i = Number(this.storage().ajax_packet_id) + 1;
        if (i !== 1 + Number(this.storage().ajax_packet_id)) {
            this.abend("incrementAjaxPacketId", "fix it");
        }
        this.storage().ajax_packet_id = i;
    };

    this.objectName = function() {return "PhwangAjaxStorageObject";};
    this.phwangAjaxObject = function() {return this.thePhwangAjaxObject;};
    this.phwangObject = function() {return this.phwangAjaxObject().phwangObject();};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_ajax_object_val);
}

var sign_up_main = function() {"use strict"; new SignUpRootObject();};
$(document).ready(sign_up_main);
