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

        const response_data = JSON.parse(response.data);
        let data = response_data.data;

        let index = 0;
        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const encoded_my_name = data.slice(index);
        const my_name = this.decodeString(encoded_my_name);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("succeed");
            console.log("link_id=", link_id);
            this.linkObject().setLinkInfoIntoStorage(link_id, my_name, response_data.time_stamp);
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

    this.decodeNumber = function(input_val, size_val) {
        let output = 0;
        for (let index = 0; index < size_val; index++) {
            output *= 10;
            output += input_val.charAt(index) - '0';
        }
        return output;
    };

    this.decodeString = function(input_val) {
        let length = 0;
        let buf = "";
        let length_str;

        switch (input_val.charAt(0)) {
            case '1':
                length_str = input_val.slice(1, 1 + 1);
                length = this.decodeNumber(length_str, 1);
                buf = input_val.slice(1 + 1, 1 + 1 + length);
                return buf;

            case '2':
                length_str = input_val.slice(1, 1 + 2);
                length = this.decodeNumber(length_str, 2);
                buf = input_val.slice(1 + 2, 1 + 2 + length);
                return buf;

            case '3':
                length_str = input_val.slice(1, 1 + 3);
                length = this.decodeNumber(length_str, 3);
                buf = input_val.slice(1 + 3, 1 + 3 + length);
                return buf;

            case '4':
                length_str = input_val.slice(1, 1 + 4);
                length = this.decodeNumber(length_str, 4);
                buf = input_val.slice(1 + 4, 1 + 4 + length);
                return buf;

            case '5':
                length_str = input_val.slice(1, 1 + 5);
                length = this.decodeNumber(length_str, 5);
                buf = input_val.slice(1 + 5, 1 + 5 + length);
                return buf;

            default:
                console.log("EncodeClass.decodeString() TBD");
                abend();
                return buf;
        }
    };

    this.linkObject = () => this.linkObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__();
}

$(document).ready(() => {new AccountLoginObject();});
