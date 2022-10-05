/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLoginObject() {
    "use strict";
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.httpServiceObject_ = new FabricHttpServiceObject(this.examineResponse, this);
        this.bindHtmlInput();
    };

    this.bindHtmlInput = function() {
        const this0 = this;
        $(".login_section .login_button").on("click", function() {
            let account_name = $(".login_section .login_account_name").val();
            let password = $(".login_section .login_password").val();
            if (account_name) {
                const output = JSON.stringify({
                        command: "login",
                        packet_id: sessionStorage.ajax_packet_id,
                        my_name: account_name,
                        password: password,
                        });
                console.log("AccountLoginObject.bindHtmlInput() LoginRequest=" + output);

                this0.httpServiceObject().sendAjaxRequest(output);
            }
        });
    };

    this.examineResponse = function(json_response_val) {
        console.log("json_response_val=" + json_response_val);

        const response = JSON.parse(json_response_val);
        console.log("response.data=" + response.data);

        const data = JSON.parse(response.data);
        if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
            console.log("succeed");
            console.log("link_id=", data.link_id);
            this.linkObject().setLinkInfoIntoStorage(data.link_id, data.my_name, data.time_stamp);
            window.history.go(-1);
        }
        else if (data.result === FE_DEF.FE_RESULT_PASSWORD_NOT_MATCH()) {
            console.log("password_not_match");
        }
        else if (data.result === FE_DEF.FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("account_not_exist");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };

    this.linkObject = () => this.linkObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__();
}

$(document).ready(() => {new AccountLoginObject();});
