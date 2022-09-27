/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    this.init__ = function() {
        this.setupQuerySelectors();
        this.FE_DEF_ = new FE_DEFINE_OBJECT();
        this.httpServiceObject_ = new HttpServiceObject(this.examineResponse, this);
        this.bindHtmlInput();
    };

    this.setupQuerySelectors = function() {
        var this0 = this;
        document.querySelector(".solo_button").addEventListener("click", function() {
            this0.sendSetupSessionRequest();
            //window.open("go_config.html", "_self");
        });

        document.querySelector(".play_with_button").addEventListener("click", function() {
            window.open("go_config.html", "_self");
        });

        document.querySelector(".exit_button").addEventListener("click", function() {
            window.history.go(-1);
        });
    };

    this.bindHtmlInput = function() {
        /*
        var this0 = this;
        $(".sign_in_section .sign_in_button").on("click", function() {
            var account_name = $(".sign_in_section .sign_in_account_name").val();
            var password = $(".sign_in_section .sign_in_password").val();
            if (account_name) {
                var output = JSON.stringify({
                        command: "setup_link",
                        packet_id: sessionStorage.ajax_packet_id,
                        my_name: account_name,
                        password: password,
                        });
                console.log("signInRequest=" + output);

                this0.httpServiceObject().sendAjaxRequest(output);
            }
        });
        */
    };

    this.examineResponse = function(json_response_val) {
        console.log("GoBaseRootObject.examineResponse() json_response_val=" + json_response_val);

        var response = JSON.parse(json_response_val);
        console.log("GoBaseRootObject.examineResponse() response.data=" + response.data);

        var data = JSON.parse(response.data);
        if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
            console.log("GoBaseRootObject.examineResponse() succeed! session_id=", data.session_id);
            sessionStorage.setItem("session_id", data.session_id);
            sessionStorage.setItem("go_config_data", data.theme_data);
            sessionStorage.setItem("peer_name", data.peer_name);
            window.open("go_act.html", "_self");
        }
        else if (data.result === this.FE_DEF().FE_RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("account_not_exist");
        }
        else {
            console.log("invalid_result=" + data.result);
        }
    };

    this.sendSetupSessionRequest = function() {
        var link_id = sessionStorage.getItem("link_id");
        if (link_id === null) {
            abend("sendSetupSessionRequest() null link_id");
            exit;
        }

        var my_name = sessionStorage.getItem("my_name");
        if (my_name === null) {
            abend("sendSetupSessionRequest() null my_name");
            exit;
        }

        var time_stamp = sessionStorage.getItem("time_stamp");
        if (time_stamp === null) {
            abend("sendSetupSessionRequest() null time_stamp");
            exit;
        }

        var theme_data = this.encodeGoConfig(my_name, 19, 0, 0, 2);

        var output = JSON.stringify({
                command: "setup_session",
                time_stamp: time_stamp,
                link_id: sessionStorage.link_id,
                theme_data: theme_data,
                peer_name: my_name,
                });
        console.log("GoBaseRootObject.sendSetupSessionRequest() output=" + output);

        this.httpServiceObject().sendAjaxRequest(output); 

    };

    this.encodeGoConfig = function(my_name_val, board_size_val, handicap_val, komi_val, my_color_val) {
        console.log("my_name_val = " + my_name_val);
        var len = 11 + my_name_val.length;
        var buf = "G";
        if (len < 100) buf = buf + 0; if (len < 10) buf = buf + 0; buf = buf + len;
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        if (handicap_val < 10) buf = buf + 0; buf = buf + handicap_val;
        if (komi_val) buf = buf + 0; buf = buf + komi_val;
        buf = buf + my_color_val;
        buf = buf + my_name_val;
        return buf;
    };

    this.FE_DEF = function() {return this.FE_DEF_;};
    this.httpServiceObject = function() {return this.httpServiceObject_;};
    this.init__();
};

var go_base_main = function() {"use strict"; new GoBaseRootObject();};
$(document).ready(go_base_main);
