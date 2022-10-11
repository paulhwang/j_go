/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountRegisterObject() {
    "use strict";
    this.init__ = function() {
        this.theHttpServiceObject = new FabricHttpReqObject(this.examineResponse, this);
        this.setupHtmlInputFunc();
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".register_section .register_button").on("click", function() {
            let account_name = $(".register_section .register_account_name").val();
            let password = $(".register_section .register_password").val();
            let email = $(".register_section .register_email").val();
            if (account_name) {
                const output = JSON.stringify({
                        command: "register",
                        my_name: account_name,
                        password: password,
                        email: email,
                        });
                console.log("AccountRegisterObject.setupHtmlInputFunc() registerRequest=" + output);

                this0.httpServiceObject().sendAjaxRequest(output);
            }
        });
    };

    this.examineResponse = function(json_response_val) {
        console.log("json_response_val=" + json_response_val);

        const response = JSON.parse(json_response_val);
        console.log("response.data=" + response.data);

        const response_data = JSON.parse(response.data);

        let data = response_data.data;

        let index = 0;
        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();
        const my_name = data.slice(index);


        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("succeed");
            window.history.go(-1);
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else {
            console.log("invalid_result=" + result);
        }
    };

    this.httpServiceObject = () => this.theHttpServiceObject;
    this.init__();
}

$(document).ready(() => {new AccountRegisterObject();});
