/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseRootObject() {
    this.init__ = function() {
        this.setupQuerySelectors();
        this.theFE_DEF = new FE_DEFINE_OBJECT();
        this.thePhwangHttpServiceObject = new PhwangHttpServiceObject(this.examineResponse, this);
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
        console.log("json_response_val=" + json_response_val);

        var response = JSON.parse(json_response_val);
        console.log("response.data=" + response.data);

        var data = JSON.parse(response.data);
        if (data.result === this.FE_DEF().FE_RESULT_SUCCEED()) {
            console.log("succeed");
            console.log("link_id=", data.link_id);
            sessionStorage.setItem("link_id", data.link_id);
            sessionStorage.setItem("my_name", data.my_name);
            sessionStorage.setItem("time_stamp", data.time_stamp);
            //window.history.go(-1);
        }
        else if (data.result === this.FE_DEF().FE_RESULT_PASSWORD_NOT_MATCH()) {
            console.log("password_not_match");
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

        var output = JSON.stringify({
                command: "setup_session",
                time_stamp: time_stamp,
                link_id: sessionStorage.link_id,
                app_type: 'G',
                theme_data: "G0151900002paul",
                his_name: my_name,
                });
        console.log("sendSetupSessionRequest=" + output);

        this.httpServiceObject().sendAjaxRequest(output);

    };

    this.FE_DEF = function() {return this.theFE_DEF;};
    this.httpServiceObject = function() {return this.thePhwangHttpServiceObject;};
    this.init__();
};

var go_base_main = function() {"use strict"; new GoBaseRootObject();};
$(document).ready(go_base_main);
