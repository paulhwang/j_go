/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);
        this.configObject_ = new GoConfigObject(this);

        this.setupHtmlInputFunc();
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
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
            console.log("GoDuetHtmlObject.setupHtmlInputFun() board_size=" + board_size + " initiator_color=" + initiator_color + " komi=" + komi + " handicap=" + handicap + " myName=" + this0.linkObj().myName() + " second_fiddle=" + second_fiddle + " theme_data=" + theme_data);
            this0.uFabricObj().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_DUET(), second_fiddle);
        });
    };

    this.renderNameList = function() {
        for (let i = 0; i < this.linkObj().nameListLength(); i++) {
            $('.peer_name_paragraph select').append($('<option>', {value:this.linkObj().nameListElement(i), text:this.linkObj().nameListElement(i)}));
        }
    };

    this.receiveFabricResponse = function(cmd_val, result_val, data1_val, data2_val, data3_val) {
        if (cmd_val !== FE_DEF.GET_LINK_DATA_RESPONSE()) {
            console.log("GoDuetPortObject.receiveFabricResponse() cmd=" + cmd_val + " result=" + result_val + " data1=" + data1_val + " data2=" + data2_val + " data3=" + data3_val);
        }

        if (cmd_val === "get_link_data") {
            this.abend();
            const data = data1_val;
            if (data.pending_session3 != "N/A") {
                console.log("GoDuetPortObject.getLinkDataResponse() pending_session3=" + data.pending_session3);
                this.fabricRequestObj().setupSession3Request(data.pending_session3);
            }
            /*
            if (data.pending_session2 != "N/A") {
                console.log("GoDuetPortObject.getLinkDataResponse() pending_session2=" + data.pending_session2);
                const pending_session2 = data.pending_session2;
                const session_id = pending_session2.slice(0, 8);
                this.fabricRequestObj().setupSession2Request(session_id);
            }
            */
        }
        else if (cmd_val === FE_DEF.SETUP_SESSION3_RESPONSE()) {
            window.open("go_play.html", "_self");
        }
        else if (cmd_val === FE_DEF.GET_NAME_LIST_RESPONSE()) {
            this.renderNameList();
        }
        else if (cmd_val === FE_DEF.GET_LINK_DATA_RESPONSE()) {
        } 
        else {
            console.log("GoDuetRootObject.receiveFabricResponse() bad cmd=" + cmd_val);
            abend();
        }
    };

    this.fabricBaseObj = () => this.fabricBaseObj_;
    this.dFabricObj = () => this.fabricBaseObj().dFabricObj();
    this.uFabricObj = () => this.fabricBaseObj().uFabricObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.configObject = () => this.configObject_;
    this.init__();
};

$(document).ready(() => {new GoDuetRootObject();});
