/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountRegisterObject() {
    "use strict";
    this.init__ = function() {
        this.theHttpServiceObject = new HttpServiceObject(this.examineResponse, this);
        this.bindHtmlInput();
    };

    this.bindHtmlInput = function() {
        var this0 = this;
        $(".register_section .register_button").on("click", function() {
            var account_name = $(".register_section .register_account_name").val();
            var password = $(".register_section .register_password").val();
            var email = $(".register_section .register_email").val();
            if (account_name) {
                var output = JSON.stringify({
                        command: "register",
                        my_name: account_name,
                        password: password,
                        email: email,
                        });
                console.log("AccountRegisterObject.bindHtmlInput() registerRequest=" + output);

                this0.httpServiceObject().sendAjaxRequest(output);
            }
        });
    };

    this.examineResponse = function(json_response_val) {
        console.log("json_response_val=" + json_response_val);

        var response = JSON.parse(json_response_val);
        console.log("response.data=" + response.data);

        var data = JSON.parse(response.data);
        if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
            console.log("succeed");
            //window.open("go_login.html", "_self")
        }
        else if (data.result === FE_DEF.FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };

    this.httpServiceObject = () => this.theHttpServiceObject;
    this.init__();
}

var sign_up_main = function() {"use strict"; new AccountRegisterObject();};
$(document).ready(sign_up_main);
