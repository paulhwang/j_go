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
            let theme_data = this0.configObj().encodeGoSoloConfig(board_size);
            console.log("GoSoloHtmlObject.setupHtmlInputFun() board_size=" + board_size + " theme_data=" + theme_data);
            this0.fabricRequestObj().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_SOLO(), "N/A");
        });
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObject().linkObject();
    this.fabricRequestObj = () => this.rootObj().fabricRequestObject();
    this.portObj = () => this.rootObj().portObject();
    this.configObj = () => this.rootObj().configObject();
    this.init__(root_obj_val);
};
