/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PhwangAjaxProtocolClass() {
    "use strict";
    this.setupLinkCommand = function () {return "setup_link";};
    this.getLinkDataCommand = function () {return "get_link_data";};
    this.getNameListCommand = function () {return "get_name_list";};
    this.setupSessionCommand = function () {return "setup_session";};
    this.setupSessionReplyCommand = function () {return "setup_session_reply";};
    this.putSessionDataCommand = function () {return "put_session_data";};
    this.getSessionDataCommand = function () {return "get_session_data";};
}
