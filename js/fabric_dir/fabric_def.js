/*
  Copyrights reserved
  Written by Paul Hwang
*/

var FE_DEF = new FE_DEF_OBJECT;

function FE_DEF_OBJECT() {
    "use strict";
    this.RESULT_SUCCEED                    = () => "00";
    this.RESULT_ACCOUNT_NAME_NOT_EXIST     = () => "01";
    this.RESULT_ACCOUNT_NAME_ALREADY_EXIST = () => "02";
    this.RESULT_PASSWORD_MATCH             = () => "05";
    this.RESULT_PASSWORD_NOT_MATCH         = () => "06";

    this.RESULT_DB_SELECT_FAIL             = () => "21";
    this.RESULT_DB_EMPTY_TABLE             = () => "22";
    this.RESULT_DB_ERROR                   = () => "23";

    this.RESULT_TIME_STAMP_NOT_MATCH       = () => "50";
    this.RESULT_LINK_NOT_EXIST             = () => "51";
    this.RESULT_SESSION_NOT_EXIST          = () => "52";
    this.RESULT_NULL_LINK                  = () => "53";
    this.RESULT_NULL_SESSION               = () => "54";
    this.RESULT_NULL_ROOM                  = () => "56";
    this.RESULT_MALLOC_SESSION_FAIL        = () => "57";
    this.RESULT_MALLOC_GROUP_FAIL          = () => "58";
    this.RESULT_HIS_LINK_NOT_EXIST         = () => "59";
    this.RESULT_NULL_HIS_SESSION           = () => "60";
    this.RESULT_ALMOST_SUCCEED             = () => "63";

    this.RESULT_MALLOC_ROOM_FAIL           = () => "71";

    this.GROUP_MODE_SOLO     = () => 'S';
    this.GROUP_MODE_DUET     = () => 'D';
    this.GROUP_MODE_ENSEMBLE = () => 'E';

    this.ROOM_STATUS_PREPARING = () => 'P';
    this.ROOM_STATUS_READY     = () => 'R';

    this.THEME_IS_GO_GAME = () => 'G';
};

