/*
  Copyrights reserved
  Written by Paul Hwang
*/

var FE_DEF = new FE_DEF_OBJECT;

function FE_DEF_OBJECT() {
    "use strict";

    this.REGISTER_COMMAND          = () => 'U';
    this.REGISTER_RESPONSE         = () => 'u';
    this.LOGIN_COMMAND             = () => 'I';
    this.LOGIN_RESPONSE            = () => 'i';
    this.LOGOUT_COMMAND            = () => 'O';
    this.LOGOUT_RESPONSE           = () => 'o';
    this.GET_LINK_DATA_COMMAND     = () => 'D';
    this.GET_LINK_DATA_RESPONSE    = () => 'd';
    this.GET_NAME_LIST_COMMAND     = () => 'N';
    this.GET_NAME_LIST_RESPONSE    = () => 'n';
    this.SETUP_SESSION_COMMAND     = () => 'S';
    this.SETUP_SESSION_RESPONSE    = () => 's';
    this.SETUP_SESSION2_COMMAND    = () => 'Y';
    this.SETUP_SESSION2_RESPONSE   = () => 'y';
    this.SETUP_SESSION3_COMMAND    = () => 'Z';
    this.SETUP_SESSION3_RESPONSE   = () => 'z';
    this.FREE_SESSION_COMMAND      = () => 'V';
    this.FREE_SESSION_RESPONSE     = () => 'v';
    this.PUT_SESSION_DATA_COMMAND  = () => 'P';
    this.PUT_SESSION_DATA_RESPONSE = () => 'p';
    this.GET_SESSION_DATA_COMMAND  = () => 'G';
    this.GET_SESSION_DATA_RESPONSE = () => 'g';
    this.READ_FILE_COMMAND         = () => 'R';
    this.READ_FILE_RESPONSE        = () => 'r';
    this.READ_MORE_FILE_COMMAND    = () => 'B';
    this.READ_MORE_FILE_RESPONSE   = () => 'b';
    this.WRITE_FILE_COMMAND        = () => 'W';
    this.WRITE_FILE_RESPONSE       = () => 'w';
    this.WRITE_MORE_FILE_COMMAND   = () => 'C';
    this.WRITE_MORE_FILE_RESPONSE  = () => 'c';
    this.MESSAGE_COMMAND           = () => 'M';
    this.MESSAGE_RESPONSE          = () => 'm';
    this.NULL_COMMAND              = () => '?';

    this.REGISTER_COMMANDS          = () => "0" + this.REGISTER_COMMAND();
    this.LOGIN_COMMANDS             = () => "0" + this.LOGIN_COMMAND();
    this.LOGOUT_COMMANDS            = () => "1" + this.LOGOUT_COMMAND();
    this.GET_LINK_DATA_COMMANDS     = () => "1" + this.GET_LINK_DATA_COMMAND();
    this.GET_NAME_LIST_COMMANDS     = () => "1" + this.GET_NAME_LIST_COMMAND();
    this.SETUP_SESSION_COMMANDS     = () => "1" + this.SETUP_SESSION_COMMAND();
    this.SETUP_SESSION2_COMMANDS    = () => "2" + this.SETUP_SESSION2_COMMAND();
    this.SETUP_SESSION3_COMMANDS    = () => "2" + this.SETUP_SESSION3_COMMAND();
    this.FREE_SESSION_COMMANDS      = () => "2" + this.FREE_SESSION_COMMAND();
    this.PUT_SESSION_DATA_COMMANDS  = () => "2" + this.PUT_SESSION_DATA_COMMAND();
    this.GET_SESSION_DATA_COMMANDS  = () => "2" + this.GET_SESSION_DATA_COMMAND();
    this.READ_FILE_COMMANDS         = () => "0" + this.READ_FILE_COMMAND();
    this.READ_MORE_FILE_COMMANDS    = () => "0" + this.READ_MORE_FILE_COMMAND();
    this.WRITE_FILE_COMMANDS        = () => "1" + this.WRITE_FILE_COMMAND();
    this.WRITE_MORE_FILE_COMMANDS   = () => "1" + this.WRITE_MORE_FILE_COMMAND();
    this.MESSAGE_COMMANDS           = () => "1" + this.MESSAGE_COMMAND();

    this.ETHERNET_MTU_SIZE = () => 1500;
    this.TCP_HEADER_SIZE     = () => 20;
    this.MAX_TCP_HEADER_SIZE = () => 60;
    this.IP_HEADER_SIZE     = () => 20;
    this.MAX_IP_HEADER_SIZE = () => 24;
    this.TCP_IP_HEADER_SIZE     = () => this.    TCP_HEADER_SIZE() + this.    IP_HEADER_SIZE();
    this.MAX_TCP_IP_HEADER_SIZE = () => this.MAX_TCP_HEADER_SIZE() + this.MAX_IP_HEADER_SIZE();
    this.MAX_TCP_DATA_SIZE = () => this.ETHERNET_MTU_SIZE() - this.MAX_TCP_IP_HEADER_SIZE();
    this.MAX_TCP_DATA_LEN_SIZE = () => 4;

    this.MAX_FILE_IO_BUF_SIZE = () => 1024;

    this.FAKE_LINK_ID_INDEX    = () => "99990000";
    this.FAKE_SESSION_ID_INDEX = () => "99980000";

    this.FABRIC_TIME_STAMP_SIZE = () => 10;
    this.LINK_ID_SIZE           = () => 8;
    this.SESSION_ID_SIZE        = () => 8;
    this.FD_LEN_SIZE            = () => 5;
    this.RESULT_SIZE            = () => 2;

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
    this.RESULT_WAITING_FOR_ANSWER         = () => "64";

    this.RESULT_MALLOC_ROOM_FAIL           = () => "71";

    this.GROUP_MODE_SOLO     = () => 'S';
    this.GROUP_MODE_DUET     = () => 'D';
    this.GROUP_MODE_ENSEMBLE = () => 'E';

    this.ROOM_STATUS_PREPARING = () => 'P';
    this.ROOM_STATUS_READY     = () => 'R';

    this.NAME_LIST_TAG_SIZE = () => 3;
    this.GET_LINK_DATA_LENGTH_SIZE = () => 2;
    this.GET_LINK_DATA_TYPE_NAME_LIST        = () => 'N';
    this.GET_LINK_DATA_TYPE_PENDING_SESSION2 = () => 'Y';
    this.GET_LINK_DATA_TYPE_PENDING_SESSION3 = () => 'Z';
    this.GET_LINK_DATA_TYPE_PENDING_DATA     = () => 'D';

    this.THEME_IS_GO_GAME = () => 'G';
};

