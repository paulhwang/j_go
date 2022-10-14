/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricLinkObject() {
    "use strict";
    this.init__ = function() {
        this.nameList_ = [];
        this.nameListTag_ = ENCODE.encodePadInteger(0, 3);
        this.serverNameListTag_ = ENCODE.encodePadInteger(0, 3);
    }

    this.getLinkInfoFromStorage = function() {
        this.linkId_ = sessionStorage.getItem("link_id");
        if (this.linkId_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null link_id");
            abend();
        }

        this.myName_ = sessionStorage.getItem("my_name");
        if (this.myName_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null my_name");
            abend();
        }

        this.fabricTimeStamp_ = sessionStorage.getItem("fabric_time_stamp");
        if (this.fabricTimeStamp_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null fabric_time_stamp");
            abend();
        }

        this.nodeTimeStamp_ = sessionStorage.getItem("node_time_stamp");
        if (this.nodeTimeStamp_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null node_time_stamp");
            abend();
        }
    };

    this.printLinkInfo = function() {
        console.log("FabricLinkObject.printLinkInfo() link_id=" + this.linkId());
        console.log("FabricLinkObject.printLinkInfo() my_name=" + this.myName());
        console.log("FabricLinkObject.printLinkInfo() fabric_time_stamp=" + this.fabricTimeStamp());
        console.log("FabricLinkObject.printLinkInfo() node_time_stamp=" + this.nodeTimeStamp());
    }

    this.setLinkInfoIntoStorage = function(link_id_val, my_name_val, fabric_time_stamp_val, node_time_stamp_val) {
        sessionStorage.setItem("link_id", link_id_val);
        sessionStorage.setItem("my_name", my_name_val);
        sessionStorage.setItem("fabric_time_stamp", fabric_time_stamp_val);
        sessionStorage.setItem("node_time_stamp", node_time_stamp_val);
    };

    this.removeLinkInfoFromStorage = function() {
        sessionStorage.removeItem("link_id");
        sessionStorage.removeItem("my_name");
        sessionStorage.removeItem("fabric_time_stamp");
        sessionStorage.removeItem("node_time_stamp");
    };

    this.linkId = () => this.linkId_;
    this.myName = () => this.myName_;
    this.fabricTimeStamp = () => this.fabricTimeStamp_;
    this.nodeTimeStamp = () => this.nodeTimeStamp_;

    this.nameListTag = () => this.nameListTag_;
    this.setNameListTag = (val) => {this.nameListTag_ = val;};
    this.serverNameListTag = () => this.serverNameListTag_;
    this.setServerNameListTag = (val) => {this.serverNameListTag_ = val;};
    this.nameList = () => this.nameList_;
    this.setNameList = (data_val) => {this.nameList_ = data_val;};
    this.nameListLength = () => this.nameList().length;
    this.nameListElement = (index_val) => {return this.nameList()[index_val];};
    this.setNameListElement = (index_val, data_val) => {this.nameList()[index_val] = data_val;};

    this.init__();
};
