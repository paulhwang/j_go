/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FE_DEFINE_OBJECT() {
    "use strict";
    this.init_= function() {
        this.theFE_RESULT_SUCCEED                    = "00";
        this.theFE_RESULT_ACCOUNT_NAME_NOT_EXIST     = "01";
        this.theFE_RESULT_ACCOUNT_NAME_ALREADY_EXIST = "02";
        this.theFE_RESULT_PASSWORD_NOT_MATCH          = "05";
        this.theFE_RESULT_LINK_NOT_EXIST             = "11";
        this.theFE_RESULT_SESSION_NOT_EXIST          = "12";
    };
    this.FE_RESULT_SUCCEED                    = function() {return this.theFE_RESULT_SUCCEED;};
    this.FE_RESULT_ACCOUNT_NAME_NOT_EXIST     = function() {return this.theFE_RESULT_ACCOUNT_NAME_NOT_EXIST;};
    this.FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST = function() {return this.theFE_RESULT_ACCOUNT_NAME_ALREADY_EXIST;};
    this.FE_RESULT_PASSWORD_NOT_MATCH         = function() {return this.theFE_RESULT_PASSWORD_NOT_MATCH;};
    this.FE_RESULT_LINK_NOT_EXIST             = function() {return this.theFE_RESULT_LINK_NOT_EXIST;};
    this.FE_RESULT_SESSION_NOT_EXIST          = function() {return this.theFE_RESULT_SESSION_NOT_EXIST;};

    this.init_();
}

