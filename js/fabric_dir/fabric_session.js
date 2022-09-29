/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricSessionObject() {
    this.init__ = function() {
    }

    this.setSessionInfoIntoStorage = function(session_id_val, group_mode_val, theme_data_val, initiator_name_val, peer_name_val) {
        sessionStorage.setItem("session_id", session_id_val);
        sessionStorage.setItem("group_mode", group_mode_val);
        sessionStorage.setItem("go_config_data", theme_data_val);
        sessionStorage.setItem("initiator_name", initiator_name_val);
        sessionStorage.setItem("peer_name", peer_name_val);
    };

    this.linkId = () => this.linkId_;
    this.myName = () => this.myName_;
    this.timeStamp = () => this.timeStamp_;
    this.init__();
};
