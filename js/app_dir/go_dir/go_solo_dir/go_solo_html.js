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
            let board_size = $(".config_section .go_config_section .board_size").val();
            let theme_data = this0.encodeGoConfig(board_size);
            console.log("GoSoloHtmlObject.setupHtmlInputFun() board_size=" + board_size + " theme_data=" + theme_data);
            this0.fabricRequestObject().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_SOLO(), "N/A");
        });
    };

    this.encodeGoConfig = function(board_size_val) {
        let buf = "";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        buf = buf + "00001";
        return buf;
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricRequestObject = () => this.rootObject().fabricRequestObject();
    this.portObject = () => this.rootObject().portObject();
    this.init__(root_object_val);
};
