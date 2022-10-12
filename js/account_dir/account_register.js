/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountRegisterObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObj_ = new FabricResponseObject(this);
        this.fabricRequestObj_ = new FabricRequestObject(this);

        this.setupHtmlInputFunc();
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".register_section .register_button").on("click", function() {
            let my_name = $(".register_section .register_account_name").val();
            let password = $(".register_section .register_password").val();
            let email = $(".register_section .register_email").val();
            if (my_name !== null) {
                console.log("AccountRegisterObject.setupHtmlInputFunc() my_name=" + my_name + " email=" + email);
                this0.fabricRequestObject().registerRequest(my_name, password, email);
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
}

$(document).ready(() => {new AccountRegisterObject();});
