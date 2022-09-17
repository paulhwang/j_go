/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SignUpRootObject() {
    "use strict";
    this.init__ = function() {
        this.theFE_DEF = new FE_DEFINE_OBJECT();
        this.theHttpRequestObject = new HttpRequestObject(this.examineResponse, this);
        this.bindHtmlInput();
    };

    this.bindHtmlInput = function() {
        var this0 = this;
        $(".sign_up_section .sign_up_button").on("click", function() {
            var account_name = $(".sign_up_section .sign_up_account_name").val();
            var password = $(".sign_up_section .sign_up_password").val();
            var email = $(".sign_up_section .sign_up_email").val();
            if (account_name) {
                console.log("ajaxPacketId=" + this0.ajaxPacketId());
                var output = JSON.stringify({
                        command: "sign_up",
                        packet_id: this0.ajaxPacketId(),
                        my_name: account_name,
                        password: password,
                        email: email,
                        });
                console.log("signUpRequest=" + output);

                this0.httpRequestObject().sendAjaxRequest(output);
            }
        });
    };

    this.examineResponse = function(json_response_val) {
        console.log("json_response_val=" + json_response_val);

        var response = JSON.parse(json_response_val);
        console.log("response.data=" + response.data);

        var data = JSON.parse(response.data);
        if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
            console.log("succeed");
            //window.open("go_login.html", "_self")
        }
        else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };

    this.FE_DEF = function() {return this.theFE_DEF;};
    this.httpRequestObject = function() {return this.theHttpRequestObject;};
    this.ajaxPacketId = function() {return this.httpRequestObject().ajaxPacketId();};
    this.init__();
}

function HttpRequestObject(callback_func_val, callback_object_val) {
    this.init__ = function() {
        this.theCallBackFunc = callback_func_val;
        this.theCallBackObject = callback_object_val;
        this.ajaxRoute = function() {return "/django_go/go_ajax/";};
        this.jsonContext = function() {return "application/json; charset=utf-8";}
        this.plainTextContext = function() {return "text/plain; charset=utf-8";}
        this.resetAjaxPacketId();
        this.theHttpGetRequest = new XMLHttpRequest();
        this.startAjaxWaiting();
    };

    this.startAjaxWaiting = function() {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.callBackFunc().bind(this0.callBackObject())(this0.httpGetRequest().responseText);
            }
        };
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

    this.resetAjaxPacketId = function() {
        if (this.ajaxPacketId() === undefined) {
            console.log("resetAjaxPacketId: undefined id");
            this.storage().ajax_packet_id = 0;
        }
    };
    this.ajaxPacketId = function() {
        return this.storage().ajax_packet_id;
    };
    this.incrementAjaxPacketId = function() {
        var i = Number(this.storage().ajax_packet_id) + 1;
        if (i !== 1 + Number(this.storage().ajax_packet_id)) {
            this.abend("incrementAjaxPacketId", "fix it");
        }
        this.storage().ajax_packet_id = i;
    };

    this.httpGetRequest = function() {return this.theHttpGetRequest;};
    this.callBackFunc = function() {return this.theCallBackFunc;};
    this.callBackObject = function() {return this.theCallBackObject;};
    this.storage = function() {return sessionStorage;};
    this.init__();
};

var sign_up_main = function() {"use strict"; new SignUpRootObject();};
$(document).ready(sign_up_main);
