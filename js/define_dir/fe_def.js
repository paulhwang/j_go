/*
  Copyrights reserved
  Written by Paul Hwang
*/

var FE_DEF = new FE_DEF_OBJECT;

function FE_DEF_OBJECT() {
    "use strict";
    this.FE_RESULT_SUCCEED                    = () => "00";
    this.FE_RESULT_ACCOUNT_NAME_NOT_EXIST     = () => "01";
    this.FE_RESULT_ACCOUNT_NAME_ALREADY_EXIST = () => "02";
    this.FE_RESULT_PASSWORD_MATCH             = () => "05";
    this.FE_RESULT_PASSWORD_NOT_MATCH         = () => "06";

    this.FE_RESULT_DB_SELECT_FAIL             = () => "21";
    this.FE_RESULT_DB_EMPTY_TABLE             = () => "22";
    this.FE_RESULT_DB_ERROR                   = () => "23";

    this.FE_RESULT_TIME_STAMP_NOT_MATCH       = () => "50";
    this.FE_RESULT_LINK_NOT_EXIST             = () => "51";
    this.FE_RESULT_SESSION_NOT_EXIST          = () => "52";
    this.FE_RESULT_NULL_LINK                  = () => "53";
    this.FE_RESULT_NULL_SESSION               = () => "54";
    this.FE_RESULT_NULL_ROOM                  = () => "56";
    this.FE_RESULT_MALLOC_SESSION_FAIL        = () => "57";
    this.FE_RESULT_MALLOC_GROUP_FAIL          = () => "58";
    this.FE_RESULT_HIS_LINK_NOT_EXIST         = () => "59";
    this.FE_RESULT_NULL_HIS_SESSION           = () => "60";

    this.theFE_RESULT_MALLOC_ROOM_FAIL        = () => "71";

    this.FE_GROUP_MODE_SOLO     = () => 'S';
    this.FE_GROUP_MODE_DUET     = () => 'D';
    this.FE_GROUP_MODE_ENSEMBLE = () => 'E';

    this.FE_ROOM_STATUS_PREPARING = () => 'P';
    this.FE_ROOM_STATUS_READY     = () => 'R';

    this.FE_THEME_IS_GO_GAME = () => 'G';
};

