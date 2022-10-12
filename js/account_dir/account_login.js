/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLoginObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObj_ = new FabricResponseObject(this);
        this.fabricRequestObj_ = new FabricRequestObject(this);

        this.setupHtmlInputFunc();
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".login_section .login_button").on("click", function() {
            let my_name = $(".login_section .login_account_name").val();
            let password = $(".login_section .login_password").val();
            if (my_name !== null) {
                console.log("AccountLoginObject.setupHtmlInputFunc() my_name=" + my_name);
                this0.fabricRequestObject().loginRequest(my_name, password);
            }
        });
    };

    this.receiveFabricResponse = function(command_val, data_val) {
    };

    this.fabricResponseObject = () => this.fabricResponseObj_;
    this.fabricRequestObject = () => this.fabricRequestObj_;
    this.linkObj = () => this.fabricRequestObject().linkObj();
    this.sessionObj = () => this.fabricRequestObject().sessionObj();
    this.init__();
};

$(document).ready(() => {new AccountLoginObject();});
