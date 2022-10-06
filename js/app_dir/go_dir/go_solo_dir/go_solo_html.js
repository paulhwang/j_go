/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.setupHtmlInputFunc();
    };

    this.setupHtmlInputFunc = function() {
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            let second_fiddle = $(".peer_name_paragraph select").val();
            let initiator_color = $(".config_section .go_config_section .stone_color").val();
            let board_size = $(".config_section .go_config_section .board_size").val();
            let komi = $(".config_section .go_config_section .komi").val();
            let handicap = $(".config_section .go_config_section .handicap").val();
            let theme_data = this0.encodeGoConfig(board_size, handicap, komi, initiator_color);
            console.log("GoSoloHtmlObject.setupHtmlInputFun() board_size=" + board_size + " initiator_color=" + initiator_color + " komi=" + komi + " handicap=" + handicap + " myName=" + this0.linkObject().myName() + " second_fiddle=" + second_fiddle + " theme_data=" + theme_data);
            this0.portObject().transmitData(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_SOLO(), "N/A");
        });
    };

    this.encodeGoConfig = function(board_size_val, handicap_val, komi_val, initiator_color_val) {
        let initiator_color;
        if (initiator_color_val == "black")
            initiator_color = 1;
        else
            initiator_color = 2;

        let buf = "";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        if (handicap_val < 10)   buf = buf + 0; buf = buf + handicap_val;
        if (komi_val < 10)       buf = buf + 0; buf = buf + komi_val;
        buf = buf + initiator_color;
        return buf;
    };

    this.setupQuerySelectors = function() {
        const theme_type = FE_DEF.THEME_IS_GO_GAME();
        const theme_data = this.encodeGoConfig(19, 0, 0, 1);

        const this0 = this;
        document.querySelector(".solo_button").addEventListener("click", function() {
            this0.portObject().transmitData(theme_type, theme_data, FE_DEF.GROUP_MODE_SOLO(), "N/A");
        });

        document.querySelector(".duet_button").addEventListener("click", function() {
            window.open("go_duet.html", "_self");
            //this0.portObject().transmitData(theme_type, theme_data, FE_DEF.GROUP_MODE_DUET(), this0.linkObject().myName());
        });

        document.querySelector(".ensemble_button").addEventListener("click", function() {
            this0.portObject().transmitData(theme_type, theme_data, FE_DEF.GROUP_MODE_ENSEMBLE(), "N/A");
        });

        document.querySelector(".exit_button").addEventListener("click", function() {
            window.history.go(-1);
        });
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricSessionSetupObject = () => this.rootObject().fabricSessionSetupObject();
    this.portObject = () => this.rootObject().portObject();
    this.init__(root_object_val);
};
