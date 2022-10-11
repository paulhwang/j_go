/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLoginObject() {
    "use strict";
    this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.httpServiceObject_ = new FabricHttpReqObject(this.examineResponse, this);
        this.setupHtmlInputFunc();
    };

    this.setupHtmlInputFunc = function() {
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
                console.log("AccountLoginObject.setupHtmlInputFunc() LoginRequest=" + output);

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
        const encoded_my_name_length = ENCODE.decodeStringGetLength(encoded_my_name);
        const my_name = ENCODE.decodeString(encoded_my_name);
        index += encoded_my_name_length;
        //console.log("my_name=" + my_name);

        const time_stamp = data.slice(index);
        console.log("time_stamp=" + time_stamp);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("succeed");
            console.log("link_id=", link_id);
            this.linkObject().setLinkInfoIntoStorage(link_id, my_name, time_stamp);
            window.history.go(-1);
        }
        else if (result === FE_DEF.RESULT_PASSWORD_NOT_MATCH()) {
            console.log("password_not_match");
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("account_not_exist");
        }
        else {
            console.log("invalid_result=" + result);
        }
    };

    this.linkObject = () => this.linkObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__();
}

$(document).ready(() => {new AccountLoginObject();});
