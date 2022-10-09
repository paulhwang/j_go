/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloHtmlObject(root_obj_val) {
    "use strict";
    this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.setupHtmlInputFunc();
    };

    this.setupHtmlInputFunc = function() {
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            let board_size = $(".config_section .go_config_section .board_size").val();
            let theme_data = this0.encodeGoConfig(board_size);
            console.log("GoSoloHtmlObject.setupHtmlInputFun() board_size=" + board_size + " theme_data=" + theme_data);
            this0.fabricRequestObj().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_SOLO(), "N/A");
        });
    };

    this.encodeGoConfig = function(board_size_val) {
        let buf = "";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        buf = buf + "00001";
        return buf;
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObject().linkObject();
    this.fabricRequestObj = () => this.rootObj().fabricRequestObject();
    this.portObj = () => this.rootObj().portObject();
    this.init__(root_obj_val);
};
