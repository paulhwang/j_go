/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountRegisterObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);

        this.setupHtmlInputFunc();
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".register_section .register_button").on("click", function() {
            let my_name = $(".register_section .register_account_name").val();
            let password = $(".register_section .register_password").val();
            let email = $(".register_section .register_email").val();
            if (my_name !== null) {
                console.log("AccountRegisterObject.setupHtmlInputFunc() my_name=" + my_name + " email=" + email);
                this0.uFabricObj().registerRequest(my_name, password, email);
            }
        });
    };

    this.receiveFabricResponse = function(command_val, data_val) {
    };

    this.fabricBaseObj = () => this.fabricBaseObj_;
    this.dFabricObj = () => this.fabricBaseObj().dFabricObj();
    this.uFabricObj = () => this.fabricBaseObj().uFabricObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.init__();
}

$(document).ready(() => {new AccountRegisterObject();});
