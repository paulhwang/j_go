/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoEnsembleRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObject_ = new FabricResponseObject(this);
        this.fabricRequestObject_ = new FabricRequestObject(this);
        this.configObject_ = new GoConfigObject(this);

        this.setupHtmlInputFunc();
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
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
            console.log("GoEnsembleHtmlObject.setupHtmlInputFun() board_size=" + board_size + " initiator_color=" + initiator_color + " komi=" + komi + " handicap=" + handicap + " myName=" + this0.linkObject().myName() + " second_fiddle=" + second_fiddle + " theme_data=" + theme_data);
            this0.fabricRequestObject().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_ENSEMBLE(), "N/A");
        });
    };

    this.receiveFabricResponse = function(command_val, data_val) {
        if (command_val !== "get_link_data") {
            console.log("GoEnsemblePortObject.receiveFabricResponse() command=" + command_val + " data=" + data_val);
        }

        if (command_val === "get_link_data") {
            if (data_val.pending_session3 != "N/A") {
                console.log("GoEnsemblePortObject.getLinkDataResponse() pending_session3=" + data_val.pending_session3);
                this.fabricRequestObj().setupSession3Request(data_val.pending_session3);
            }
        }

        else if (command_val === "setup_session3") {
            window.open("go_play.html", "_self");
        }

        else if (command_val === "get_link_data") {} else if (command_val === "get_name_list") {} else {console.log("bad command"); abend();}
    };

    this.fabricResponseObject = () => this.fabricResponseObject_;
    this.fabricRequestObject = () => this.fabricRequestObject_;
    this.linkObject = () => this.fabricRequestObject().linkObject();
    this.sessionObject = () => this.fabricRequestObject().sessionObject();
    this.htmlObject = () => this.htmlObject_;
    this.portObject = () => this.portObject_;
    this.configObject = () => this.configObject_;
    this.init__();
};

$(document).ready(() => {new GoEnsembleRootObject();});
