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
        this.theFE_RESULT_PASSWORD_MATCH             = "05";
        this.theFE_RESULT_PASSWORD_NOT_MATCH         = "06";

        this.theFE_RESULT_DB_SELECT_FAIL             = "21";
        this.theFE_RESULT_DB_EMPTY_TABLE             = "22";
        this.theFE_RESULT_DB_ERROR                   = "23";

        this.theFE_RESULT_TIME_STAMP_NOT_MATCH       = "50";
        this.theFE_RESULT_LINK_NOT_EXIST             = "51";
        this.theFE_RESULT_SESSION_NOT_EXIST          = "52";
        this.theFE_RESULT_NULL_LINK                  = "53";
        this.theFE_RESULT_NULL_SESSION               = "54";
        this.theFE_RESULT_NULL_ROOM                  = "56";
        this.theFE_RESULT_MALLOC_SESSION_FAIL        = "57";
        this.theFE_RESULT_MALLOC_GROUP_FAIL          = "58";
        this.theFE_RESULT_HIS_LINK_NOT_EXIST         = "59";
        this.theFE_RESULT_NULL_HIS_SESSION           = "60";

        this.theFE_RESULT_MALLOC_ROOM_FAIL           = "71";
    };
    this.FE_RESULT_SUCCEED                    = function() {return this.theFE_RESULT_SUCCEED;};
    this.FE_RESULT_ACCOUNT_NAME_NOT_EXIST     = function() {return this.theFE_RESULT_ACCOUNT_NAME_NOT_EXIST;};
    this.FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST = function() {return this.theFE_RESULT_ACCOUNT_NAME_ALREADY_EXIST;};
    this.FE_RESULT_PASSWORD_MATCH             = function() {return this.theFE_RESULT_PASSWORD_MATCH;};
    this.FE_RESULT_PASSWORD_NOT_MATCH         = function() {return this.theFE_RESULT_PASSWORD_NOT_MATCH;};

    this.FE_RESULT_DB_SELECT_FAIL             = function() {return this.theFE_RESULT_DB_SELECT_FAIL;};
    this.FE_RESULT_DB_EMPTY_TABLE             = function() {return this.theFE_RESULT_DB_EMPTY_TABLE;};
    this.FE_RESULT_DB_ERROR                   = function() {return this.theFE_RESULT_DB_ERROR;};

    this.FE_RESULT_TIME_STAMP_NOT_MATCH             = function() {return this.theFE_RESULT_TIME_STAMP_NOT_MATCH;};
    this.FE_RESULT_LINK_NOT_EXIST             = function() {return this.theFE_RESULT_LINK_NOT_EXIST;};
    this.FE_RESULT_SESSION_NOT_EXIST          = function() {return this.theFE_RESULT_SESSION_NOT_EXIST;};

    this.FE_ROOM_STATUS_PREPARING = () => 'P';
    this.FE_ROOM_STATUS_READY     = () => 'R';

    this.init_();
}

