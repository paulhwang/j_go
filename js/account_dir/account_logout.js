/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLogoutObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObj_ = new DFabricObject(this);
        this.fabricRequestObj_ = new FabricRequestObject(this);

        this.setupHtmlInputFunc();
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".logout_section .logout_button").on("click", function() {
            this0.fabricRequestObject().logoutRequest();
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

$(document).ready(() => {new AccountLogoutObject();});
