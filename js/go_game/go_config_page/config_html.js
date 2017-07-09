/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.setupHtmlInputFunction();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "ConfigHtmlObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.phwangLinkStorageObject = function () {
        return this.rootObject().phwangLinkStorageObject();
    };

    this.phwangSessionStorageObject = function () {
        return this.rootObject().phwangSessionStorageObject();
    };

    this.configStorageObject = function () {
        return this.rootObject().configStorageObject();
    };

    this.phwangAjaxObject = function () {
        return this.rootObject().phwangAjaxObject();
    };

    this.phwangLinkObject = function () {
        return this.rootObject().phwangLinkObject();
    };

    this.phwangSessionObject = function () {
        return this.rootObject().phwangSessionObject();
    };

    this.renderNameListFuncExist = function () {
        return true;
    };

    this.setupHtmlInputFunction = function () {
        this.renderNameList();
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            this0.phwangSessionStorageObject().setHisName($(".peer_name_paragraph select").val());
            this0.configStorageObject().setBoardSize($(".config_section .go_config_section .board_size").val());
            this0.configStorageObject().setStoneColor($(".config_section .go_config_section .stone_color").val());
            this0.configStorageObject().setKomi($(".config_section .go_config_section .komi").val());
            this0.configStorageObject().setHandicap($(".config_section .go_config_section .handicap").val());
            this0.debug(true, "setupHtmlInput", "boardSize=" + this0.configStorageObject().boardSize() + " stoneColor=" + this0.configStorageObject().stoneColor() + " komi=" + this0.configStorageObject().komi() + " handicap=" + this0.configStorageObject().handicap());
            var config = JSON.stringify({
                            board_size: this0.configStorageObject().boardSize(),
                            color: this0.configStorageObject().stoneColor(),
                            komi: this0.configStorageObject().komi(),
                            handicap: this0.configStorageObject().handicap(),
                            });
            var topic_data = JSON.stringify({
                            title: "go",
                            config: config,
                            });

            var theme_data = "GO";
            if (this0.configStorageObject().boardSize() < 10)
                theme_data = theme_data + 0;
            theme_data = theme_data + this0.configStorageObject().boardSize();
            if (this0.configStorageObject().handicap() < 10)
                theme_data = theme_data + 0;
            theme_data = theme_data + this0.configStorageObject().handicap();
            if (this0.configStorageObject().komi() < 10)
                theme_data = theme_data + 0;
            theme_data = theme_data + this0.configStorageObject().komi();

            this0.phwangAjaxObject().setupSession(this0.phwangLinkObject(), topic_data, theme_data, this0.phwangSessionStorageObject().hisName());
        });
    };

    this.renderNameList = function () {
        var i = 0;
        while (i < this.phwangLinkObject().nameListLength()) {
            $('.peer_name_paragraph select').append($('<option>', {value:this.phwangLinkObject().nameListElement(i), text:this.phwangLinkObject().nameListElement(i)}));
            i += 1;
        }
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(root_object_val);
}

