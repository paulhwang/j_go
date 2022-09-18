/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SignUpObject() {
    "use strict";
    this.init__ = function() {
        this.theFE_DEF = new FE_DEFINE_OBJECT();
        this.thePhwangHttpServiceObject = new PhwangHttpServiceObject(this.examineResponse, this);
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
                        my_name: account_name,
                        password: password,
                        email: email,
                        });
                console.log("signUpRequest=" + output);

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
    this.httpServiceObject = function() {return this.thePhwangHttpServiceObject;};
    this.init__();
}

var sign_up_main = function() {"use strict"; new SignUpObject();};
$(document).ready(sign_up_main);
