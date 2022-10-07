/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricLinkObject() {
    "use strict";
    this.init__ = function() {
        this.nameList_ = [];
        this.nameListTag_ = 0;
        this.serverNameListTag_ = 0;
    }

    this.getLinkInfoFromStorage = function() {
        this.linkId_ = sessionStorage.getItem("link_id");
        if (this.linkId_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null link_id");
            abend();
            return -1;
        }

        this.myName_ = sessionStorage.getItem("my_name");
        if (this.myName_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null my_name");
            abend();
            return -1;
        }

        this.timeStamp_ = sessionStorage.getItem("time_stamp");
        if (this.timeStamp_ === null) {
            console.log("FabricLinkObject.getLinkInfoFromStorage() null time_stamp");
            abend();
            return -1;
        }

        return 0;
    };

    this.printLinkInfo = function() {
        console.log("FabricLinkObject.getLinkInfoFromStorage() link_id=" + this.linkId());
        console.log("FabricLinkObject.getLinkInfoFromStorage() my_name=" + this.myName());
        console.log("FabricLinkObject.getLinkInfoFromStorage() time_stamp=" + this.timeStamp());
    }

    this.setLinkInfoIntoStorage = function(link_id_val, my_name_val, time_stamp_val) {
        sessionStorage.setItem("link_id", link_id_val);
        sessionStorage.setItem("my_name", my_name_val);
        sessionStorage.setItem("time_stamp", time_stamp_val);
    };

    this.nameListUpdateNeeded = function () {
        if (this.serverNameListTag() > this.nameListTag()) {
            console.log("true");
            return true;
        }
        else {
            console.log("false");
            return false;
        }
    };


    this.encodePadInteger = function(num_val, size_val) {
        if ((num_val === undefined) || (num_val === null)) {
            console.log("FabricLinkObject.encodePadInteger() null num_val");
            abend();
        }

        let str = "" + num_val;
        while (str.length < size_val) {
            str = "0" + str;
        }

        //console.log("FabricLinkObject.encodePadInteger() str=" + str);
        return str;
    };

    this.linkId = () => this.linkId_;
    this.myName = () => this.myName_;
    this.timeStamp = () => this.timeStamp_;

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
