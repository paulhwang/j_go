/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLogoutObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);

        this.setupHtmlInputFunc();
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        const this0 = this;
        $(".logout_section .logout_button").on("click", function() {
            this0.uFabricObj().logoutRequest();
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

$(document).ready(() => {new AccountLogoutObject();});
