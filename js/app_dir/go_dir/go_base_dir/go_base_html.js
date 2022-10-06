/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.setupQuerySelectors();
    }

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

    this.encodeGoConfig = function(board_size_val, handicap_val, komi_val, initiator_color_val) {
        let buf = "";
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        if (handicap_val < 10)   buf = buf + 0; buf = buf + handicap_val;
        if (komi_val < 10)       buf = buf + 0; buf = buf + komi_val;
        buf = buf + initiator_color_val;
        return buf;
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricSessionSetupObject = () => this.rootObject().fabricSessionSetupObject();
    this.portObject = () => this.rootObject().portObject();
    this.init__(root_object_val);
};
