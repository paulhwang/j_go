/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SignInObject() {
    "use strict";
    this.init__ = function() {
        this.theFE_DEF = new FE_DEFINE_OBJECT();
        this.thePhwangHttpServiceObject = new PhwangHttpServiceObject(this.examineResponse, this);
        this.bindHtmlInput();
    };

    this.bindHtmlInput = function() {
        var this0 = this;
        $(".sign_in_section .sign_in_button").on("click", function() {
            var account_name = $(".sign_in_section .sign_in_account_name").val();
            var password = $(".sign_in_section .sign_in_password").val();
            if (account_name) {
                var output = JSON.stringify({
                        command: "setup_link",
                        packet_id: sessionStorage.ajax_packet_id,
                        my_name: account_name,
                        password: password,
                        });
                console.log("signInRequest=" + output);

                this0.httpServiceObject().sendAjaxRequest(output);
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
            console.log("link_id=", data.link_id);
            window.open("go_config.html", "_self")
        }
        else if (data.result === this.FE_DEF().FE_RESULT_PASSWORD_NOT_MATCH()) {
            console.log("password_not_match");
        }
        else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("account_not_exist");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };
    /*
    this.receiveSetupLinkResponse = function(result_val) {
        this.debug(true, "receiveSetupLinkResponse", "result_val=" + result_val);
        var data = JSON.parse(result_val);
        if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
            this.debug(false, "receiveSetupLinkResponse", "succeed");
            this.phwangLinkObject().setTimeStamp(data.time_stamp);
            this.phwangLinkObject().setLinkId(data.link_id);
            this.phwangLinkObject().putStorageLinkData();
            this.htmlObject().gotoGoConfigPage();
        }
        else if (data.result === this.FE_DEF().FE_RESULT_PASSWORD_NOT_MATCH()) {
            this.debug(true, "receiveSetupLinkResponse", "password_not_match");

        }
        else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            this.debug(true, "receiveSetupLinkResponse", "account_not_exist");
            this.htmlObject().gotoSignUpPage();
        }
        else {
            this.abend("receiveSetupLinkResponse", "invalid_result=" + data.result);
        }
    };
*/

    this.FE_DEF = function() {return this.theFE_DEF;};
    this.httpServiceObject = function() {return this.thePhwangHttpServiceObject;};
    this.init__();
}

var sign_in_main = function() {"use strict"; new SignInObject();};
$(document).ready(sign_in_main);
