/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxProtocolClass() {
    "use strict";
    this.SETUP_LINK_COMMAND = function () {return "setup_link";}
    this.GET_LINK_DATA_COMMAND = function () {return "get_link_data";}
    this.GET_NAME_LIST_COMMAND = function () {return "get_name_list";}
    this.SETUP_SESSION_COMMAND = function () {return "setup_session";}
    this.SETUP_SESSION_REPLY_COMMAND = function () {return "setup_session_reply";}
    this.PUT_SESSION_DATA_COMMAND = function () {return "put_session_data";}
    this.GET_SESSION_DATA_COMMAND = function () {return "get_session_data";}

    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_SESSION = function () {return 'S';}
    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_PENDING_DATA = function () {return 'D';}
    this.WEB_FABRIC_PROTOCOL_RESPOND_IS_GET_LINK_DATA_NAME_LIST = function () {return 'N';}
}
