/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricSessionObject() {
    this.init__ = function() {
    }

    this.getSessionInfoFromStorage = function() {
        this.sessionId_ = sessionStorage.getItem("session_id");
        if (this.sessionId_ === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null session_id");
            abend();
            return -1;
        }
        this.groupMode = sessionStorage.getItem("group_mode");
        if (this.groupMode === undefined) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() undefined group_mode");
            abend();
            return -1;
        }
        this.themeData = sessionStorage.getItem("theme_data");
        if (this.themeData === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null theme_data");
            abend();
            return -1;
        }
        this.initiatorName = sessionStorage.getItem("initiator_name");
        if (this.initiatorName === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null initiator_name");
            abend();
            return -1;
        }
        this.peerName = sessionStorage.getItem("peer_name");
        if (this.peerName === null) {
            console.log("FabricSessionObject.getSessionInfoFromStorage() null peer_name");
            abend();
            return -1;
        }
        return 0;
    };

    this.setSessionInfoIntoStorage = function(session_id_val, group_mode_val, theme_data_val, initiator_name_val, peer_name_val) {
        sessionStorage.setItem("session_id", session_id_val);
        sessionStorage.setItem("group_mode", group_mode_val);
        sessionStorage.setItem("theme_data", theme_data_val);
        sessionStorage.setItem("initiator_name", initiator_name_val);
        sessionStorage.setItem("peer_name", peer_name_val);
    };

    this.sessionId = () => this.sessionId_;
    this.groupMode = () => this.groupMode_;
    this.themeData = () => this.themeData_;
    this.initiatorName = () => this.initiatorName_;
    this.peerName = () => this.peerName_;
    this.init__();
};
