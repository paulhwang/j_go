/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseFabricObject() {
    this.init__ = function(go_base_root_object_val) {
        this.theGoBaseRootObject = go_base_root_object_val;
        this.getLinkInfoFromStorage();
        this.FE_DEF_ = new FE_DEFINE_OBJECT();
        this.httpServiceObject_ = new HttpServiceObject(this.examineResponse, this);
    };

    this.examineResponse = function(json_response_val) {
        console.log("GoBaseFabricObject.examineResponse() json_response_val=" + json_response_val);

        var response = JSON.parse(json_response_val);
        console.log("GoBaseFabricObject.examineResponse() response.data=" + response.data);

        if (response.command === "setup_session") {
            var data = JSON.parse(response.data);
            if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
                console.log("GoBaseFabricObject.examineResponse(setup_session) succeed! session_id=", data.session_id);
                this.sendGetSessionSetupStatusRequest(data.session_id);
            }
            else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
                console.log("GoBaseFabricObject.examineResponse(setup_session) account_not_exist");
            }
            else {
                console.log("GoBaseFabricObject.examineResponse(setup_session) invalid_result=" + data.result);
            }
        }
        else if (response.command === "setup_session1") {
            var data = JSON.parse(response.data);
            if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
                console.log("GoBaseFabricObject.examineResponse(setup_session1) succeed! session_id=", data.session_id);
                this.sendGetSessionSetupStatusRequest(data.session_id);
            }
            else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
                console.log("GoBaseFabricObject.examineResponse(setup_session1) account_not_exist");
            }
            else {
                console.log("GoBaseFabricObject.examineResponse(setup_session1) invalid_result=" + data.result);
            }
        }
        else if (response.command === "get_session_setup_status") {
            var data = JSON.parse(response.data);
            if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
                console.log("GoBaseFabricObject.examineResponse(get_session_setup_status) succeed! session_id=", data.session_id);
                if (data.room_status === 'R') {
                    this.setSessionInfoIntoStorage(data.session_id, data.group_mode, data.theme_data, data.initiator_name, data.peer_name);
                    window.open("go_play.html", "_self");
                }
                else {
                    this.sendGetSessionSetupStatusRequest(data.session_id);
                }
            }
            else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
                console.log("GoBaseFabricObject.examineResponse(get_session_setup_status) account_not_exist");
            }
            else {
                console.log("GoBaseFabricObject.examineResponse(get_session_setup_status) invalid_result=" + data.result);
            }
        }
        else {
            abend();
        }
    };

    this.sendSetupSoloSessionRequest = function() {
        var theme_data = this.encodeGoConfig(19, 0, 0, 1);
        var output = JSON.stringify({
                command: "setup_session",
                time_stamp: this.timeStamp_,
                link_id: this.linkId_,
                initiator_name: this.myName_,
                peer_name: this.myName_,
                theme_data: theme_data,
                });
        console.log("GoBaseFabricObject.sendSetupSoloSessionRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.sendSetupGroupSessionRequest = function(peer_name_val) {
        var theme_data = this.encodeGoConfig(19, 0, 0, 1);
        var output = JSON.stringify({
                command: "setup_session1",
                time_stamp: this.timeStamp_,
                link_id: this.linkId_,
                initiator_name: this.myName_,
                peer_name: peer_name_val,
                theme_data: theme_data,
                });
        console.log("GoBaseFabricObject.sendSetupGroupSessionRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.sendGetSessionSetupStatusRequest = function(session_id_val) {
        var theme_data = this.encodeGoConfig(this.myName_, 19, 0, 0, 1);
        var output = JSON.stringify({
                command: "get_session_setup_status",
                time_stamp: this.timeStamp_,
                link_id: this.linkId_,
                session_id: session_id_val,
                });
        console.log("GoBaseFabricObject.sendGetSessionSetupStatusRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.encodeGoConfig = function(board_size_val, handicap_val, komi_val, initiator_color_val) {
        var buf = "G17";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        if (handicap_val < 10)   buf = buf + 0; buf = buf + handicap_val;
        if (komi_val < 10)       buf = buf + 0; buf = buf + komi_val;
        buf = buf + initiator_color_val;
        return buf;
    };

    this.getLinkInfoFromStorage = function() {
        this.linkId_ = sessionStorage.getItem("link_id");
        if (this.linkId_ === null) {
            abend("GoBaseFabricObject.init__() null link_id");
            return -1;
        }
        this.myName_ = sessionStorage.getItem("my_name");
        if (this.myName_ === null) {
            abend("GoBaseFabricObject.init__() null my_name");
            return -1;
        }
        this.timeStamp_ = sessionStorage.getItem("time_stamp");
        if (this.timeStamp_ === null) {
            abend("GoBaseFabricObject.init__() null time_stamp");
            return -1;
        }
        return 0;
    };

    this.setSessionInfoIntoStorage = function(session_id_val, group_mode_val, theme_data_val, initiator_name_val, peer_name_val) {
        sessionStorage.setItem("session_id", session_id_val);
        sessionStorage.setItem("group_mode", group_mode_val);
        sessionStorage.setItem("go_config_data", theme_data_val);
        sessionStorage.setItem("initiator_name", initiator_name_val);
        sessionStorage.setItem("peer_name", peer_name_val);
    };

    this.FE_DEF = function() {return this.FE_DEF_;};
    this.httpServiceObject = function() {return this.httpServiceObject_;};
    this.init__();
};
