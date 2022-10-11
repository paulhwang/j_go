/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObject_ = new FabricResponseObject(this);
        this.fabricRequestObject_ = new FabricRequestObject(this);
        this.configObject_ = new GoConfigObject(this);

        this.setupHtmlInputFunc();
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        this.renderNameList();
        const this0 = this;
        $(".config_section .config_button").on("click", function() {
            let second_fiddle = $(".peer_name_paragraph select").val();
            let initiator_color = $(".config_section .go_config_section .stone_color").val();
            let board_size = $(".config_section .go_config_section .board_size").val();
            let komi = $(".config_section .go_config_section .komi").val();
            let handicap = $(".config_section .go_config_section .handicap").val();
            const theme_data = this0.configObject().encodeGoConfig(board_size, handicap, komi, initiator_color);
            console.log("GoDuetHtmlObject.setupHtmlInputFun() board_size=" + board_size + " initiator_color=" + initiator_color + " komi=" + komi + " handicap=" + handicap + " myName=" + this0.linkObject().myName() + " second_fiddle=" + second_fiddle + " theme_data=" + theme_data);
            this0.fabricRequestObject().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_DUET(), second_fiddle);
        });
    };

    this.renderNameList = function() {
        for (let i = 0; i < this.linkObject().nameListLength(); i++) {
            $('.peer_name_paragraph select').append($('<option>', {value:this.linkObject().nameListElement(i), text:this.linkObject().nameListElement(i)}));
        }
    };

    this.receiveFabricResponse = function(command_val, data_val) {
        if (command_val !== "get_link_data") {
            console.log("GoPlayPortObject.receiveFabricResponse() command=" + command_val + " data=" + data_val);
        }

        if (command_val === "get_link_data") {
            if (data_val.pending_session3 != "N/A") {
                console.log("GoDuetPortObject.getLinkDataResponse() pending_session3=" + data_val.pending_session3);
                this.fabricRequestObj().setupSession3Request(data_val.pending_session3);
            }
            /*
            if (data_val.pending_session2 != "N/A") {
                console.log("GoDuetPortObject.getLinkDataResponse() pending_session2=" + data_val.pending_session2);
                const pending_session2 = data_val.pending_session2;
                const session_id = pending_session2.slice(0, 8);
                this.fabricRequestObj().setupSession2Request(session_id);
            }
            */
        }

        else if (command_val === "get_name_list") {
            this.renderNameList();
        }

        else if (command_val === "setup_session3") {
            window.open("go_play.html", "_self");
        }

        else if (command_val === "get_link_data") {} else if (command_val === "get_name_list") {} else {console.log("bad command"); abend();}
    };

    this.fabricResponseObject = () => this.fabricResponseObject_;
    this.fabricRequestObject = () => this.fabricRequestObject_;
    this.linkObject = () => this.fabricRequestObject().linkObj();
    this.sessionObject = () => this.fabricRequestObject().sessionObj();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.configObject = () => this.configObject_;
    this.init__();
};

$(document).ready(() => {new GoDuetRootObject();});
