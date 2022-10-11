/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoDuetHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.setupHtmlInputFunc();
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

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.portObject = () => this.rootObject().portObject();
    this.configObject = () => this.rootObject().configObject();
    this.init__(root_object_val);
};
