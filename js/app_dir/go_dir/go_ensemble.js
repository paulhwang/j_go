/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoEnsembleRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricBaseObj_ = new FabricBaseObject(this);
        this.configObject_ = new GoConfigObject(this);

        this.setupHtmlInputFunc();
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            let second_fiddle = $(".peer_name_paragraph select").val();
            let initiator_color = $(".config_section .go_config_section .stone_color").val();
            let board_size = $(".config_section .go_config_section .board_size").val();
            let komi = $(".config_section .go_config_section .komi").val();
            let handicap = $(".config_section .go_config_section .handicap").val();
            let theme_data = this0.configObject().encodeGoConfig(board_size, handicap, komi, initiator_color);
            console.log("GoEnsembleHtmlObject.setupHtmlInputFun() board_size=" + board_size + " initiator_color=" + initiator_color + " komi=" + komi + " handicap=" + handicap + " myName=" + this0.linkObj().myName() + " second_fiddle=" + second_fiddle + " theme_data=" + theme_data);
            this0.uFabricObj().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_ENSEMBLE(), "N/A");
        });
    };

    this.receiveFabricResponse = function(cmd_val, result_val, data1_val, data2_val, data3_val) {
        if (cmd_val !== FE_DEF.GET_LINK_DATA_RESPONSE()) {
            console.log("GoEnsemblePortObject.receiveFabricResponse() cmd=" + cmd_val + " result=" + result_val + " data1=" + data1_val + " data2=" + data2_val + " data3=" + data3_val);
        }

        if (cmd_val === "get_link_data") {
            abend();
            if (data_val.pending_session3 != "N/A") {
                console.log("GoEnsemblePortObject.getLinkDataResponse() pending_session3=" + data_val.pending_session3);
                this.uFabricObj().setupSession3Request(data_val.pending_session3);
            }
        }
        else if (cmd_val === FE_DEF.SETUP_SESSION_RESPONSE()) {
            if (result_val == FE_DEF.RESULT_SUCCEED()) {
            }
            else {
            }
        }
        else if (cmd_val === FE_DEF.SETUP_SESSION3_RESPONSE()) {
            if (result_val == FE_DEF.RESULT_SUCCEED()) {
                window.open("go_play.html", "_self");
            }
            else {
            }
        }
        else if (cmd_val === FE_DEF.GET_NAME_LIST_RESPONSE()) {
            //this.renderNameList();
        }
        else if (cmd_val === FE_DEF.GET_LINK_DATA_RESPONSE()) {
        } 
        else {
            console.log("GoEnsemblePortObject.receiveFabricResponse() bad cmd=" + cmd_val);
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

$(document).ready(() => {new GoEnsembleRootObject();});
