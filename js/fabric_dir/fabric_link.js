/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricLinkObject() {
    this.init__ = function() {
        this.getLinkInfoFromStorage();
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

    this.linkId = () => this.linkId_;
    this.myName = () => this.myName_;
    this.timeStamp = () => this.timeStamp_;
    this.init__();
};
