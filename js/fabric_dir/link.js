/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LinkObject(root_obj_val) {
    "use strict";
    this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.initNameList();

        this.sessionObj_ = new SessionObject(this);
        console.log("LinkObject.init__() session_id=" + this.sessionObj().sessionId());
        if (this.sessionObj().validSessionId()) {
            this.sessionObj().printSessionInfo();
        }
    }

    this.initNameList = () => {
        this.nameList_ = [];
        this.nameListTag_ = ENCODE.encodePadInteger(0, FE_DEF.NAME_LIST_TAG_SIZE());
        this.serverNameListTag_ = ENCODE.encodePadInteger(0, FE_DEF.NAME_LIST_TAG_SIZE());
    };

    this.printLinkInfo = () => {
        console.log("LinkObject.printLinkInfo() link_id=" + this.linkId());
        console.log("LinkObject.printLinkInfo() my_name=" + this.myName());
        console.log("LinkObject.printLinkInfo() fabric_time_stamp=" + this.fabricTimeStamp());
        console.log("LinkObject.printLinkInfo() node_time_stamp=" + this.nodeTimeStamp());
    }

    this.setLinkInfoIntoStorage = (link_id_val, my_name_val, fabric_time_stamp_val, node_time_stamp_val) => {
        sessionStorage.setItem("link_id", link_id_val);
        sessionStorage.setItem("my_name", my_name_val);
        sessionStorage.setItem("fabric_time_stamp", fabric_time_stamp_val);
        sessionStorage.setItem("node_time_stamp", node_time_stamp_val);
    };

    this.removeLinkInfoFromStorage = () => {
        if (this.sessionObj() !== null) {
            this.sessionObj().removeSessionInfoFromStorage();
        }

        sessionStorage.removeItem("link_id");
        sessionStorage.removeItem("my_name");
        sessionStorage.removeItem("fabric_time_stamp");
        sessionStorage.removeItem("node_time_stamp");
    };

    this.validLinkId = () => UTILS.validValue(this.linkId());
    this.rootObj = () => this.rootObj_;
    this.sessionObj = () => this.sessionObj_;
    this.linkId = () => sessionStorage.getItem("link_id");
    this.myName = () => sessionStorage.getItem("my_name");
    this.fabricTimeStamp = () => sessionStorage.getItem("fabric_time_stamp");
    this.nodeTimeStamp = () => sessionStorage.getItem("node_time_stamp");

    this.nameListTag = () => this.nameListTag_;
    this.setNameListTag = (val) => {this.nameListTag_ = val;};
    this.serverNameListTag = () => this.serverNameListTag_;
    this.setServerNameListTag = (val) => {this.serverNameListTag_ = val;};
    this.nameList = () => this.nameList_;
    this.setNameList = (data_val) => {this.nameList_ = data_val;};
    this.nameListLength = () => this.nameList().length;
    this.nameListElement = (index_val) => {return this.nameList()[index_val];};
    this.setNameListElement = (index_val, data_val) => {this.nameList()[index_val] = data_val;};

    this.init__(root_obj_val);
};
