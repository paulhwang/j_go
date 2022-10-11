/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLogoutObject() {
    "use strict";
    this.init__ = function() {
        this.theHttpServiceObject = new FabricHttpReqObject(this.examineResponse, this);
        this.setupHtmlInputFunc();
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".logout_section .logout_button").on("click", function() {
            let account_name = $(".logout_section .logout_account_name").val();
            if (account_name) {
                const output = JSON.stringify({
                        command: "logout",
                        time_stamp: sessionStorage.time_stamp,
                        link_id: sessionStorage.link_id,
                        my_name: sessionStorage.my_name,
                        });
                console.log("AccountLogoutObject.setupHtmlInputFunc() Logout Request=" + output);

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
        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const encoded_my_name = data.slice(index);
        const my_name = encoded_my_name;//It's ok for now



        if (result === FE_DEF.RESULT_SUCCEED()) {
            sessionStorage.setItem("link_id", null);
            sessionStorage.setItem("my_name", null);
            sessionStorage.setItem("time_stamp", null);
            console.log("succeed");
            window.history.go(-1);
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else if (result === FE_DEF.RESULT_TIME_STAMP_NOT_MATCH()) {
            console.log("time_stamp_not_match");
        }
        else {
            console.log("invalid_result=" + result);
        }
    };

    this.httpServiceObject = () => this.theHttpServiceObject;
    this.init__();
}

$(document).ready(() => {new AccountLogoutObject();});
