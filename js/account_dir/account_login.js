/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLoginObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);

        this.setupHtmlInputFunc();
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".login_section .login_button").on("click", function() {
            let my_name = $(".login_section .login_account_name").val();
            let password = $(".login_section .login_password").val();
            if (my_name !== null) {
                console.log("AccountLoginObject.setupHtmlInputFunc() my_name=" + my_name);
                this0.uFabricObj().loginRequest(my_name, password);
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
};

$(document).ready(() => {new AccountLoginObject();});
