/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AccountLogoutObject() {
    "use strict";
    this.init__ = () => {
        this.fabricBaseObj_ = new FabricBaseObject(this);

        console.log("AccountLogoutObject.init__() sessionStorage link_id=" + sessionStorage.getItem("link_id"));
        console.log("AccountLogoutObject.init__() this.linkObj().linkId()=" + this.linkObj().linkId());

        this.setupHtmlInputFunc();
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = () => {
        const this0 = this;
        $(".logout_section .logout_button").on("click", () => {
            this0.uFabricObj().logoutRequest();
        });
    };

    this.receiveFabricResponse = (command_val, data_val) => {
    };

    this.fabricBaseObj = () => this.fabricBaseObj_;
    this.dFabricObj = () => this.fabricBaseObj().dFabricObj();
    this.uFabricObj = () => this.fabricBaseObj().uFabricObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.init__();
}

$(document).ready(() => {new AccountLogoutObject();});
