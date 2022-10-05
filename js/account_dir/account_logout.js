/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLogoutObject() {
    "use strict";
    this.init__ = function() {
        this.theHttpServiceObject = new FabricHttpServiceObject(this.examineResponse, this);
        this.bindHtmlInput();
    };

    this.bindHtmlInput = function() {
        var this0 = this;
        $(".logout_section .logout_button").on("click", function() {
            var account_name = $(".logout_section .logout_account_name").val();
            if (account_name) {
                var output = JSON.stringify({
                        command: "logout",
                        time_stamp: sessionStorage.time_stamp,
                        link_id: sessionStorage.link_id,
                        my_name: sessionStorage.my_name,
                        });
                console.log("AccountLogoutObject.bindHtmlInput() Logout Request=" + output);

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
            sessionStorage.setItem("link_id", null);
            sessionStorage.setItem("my_name", null);
            sessionStorage.setItem("time_stamp", null);
            console.log("succeed");
            window.history.go(-1);
        }
        else if (data.result === FE_DEF.FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else if (data.result === FE_DEF.FE_RESULT_TIME_STAMP_NOT_MATCH()) {
            console.log("time_stamp_not_match");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };

    this.httpServiceObject = () => this.theHttpServiceObject;
    this.init__();
}

var sign_off_main = function() {"use strict"; new AccountLogoutObject();};
$(document).ready(sign_off_main);
