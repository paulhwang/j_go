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

    this.renderNameListFuncExist = function () {
        return true;
    };

    this.setupHtmlInputFunction = function () {
        this.renderNameList();
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            this0.phwangSessionObject().setHisName($(".peer_name_paragraph select").val());

            this0.configObject().setBoardSize($(".config_section .go_config_section .board_size").val());
            this0.configObject().setMyColor($(".config_section .go_config_section .stone_color").val());
            this0.configObject().setKomiPoint($(".config_section .go_config_section .komi").val());
            this0.configObject().setHandicapPoint($(".config_section .go_config_section .handicap").val());
            this0.configObject().encodeConfig();
            this0.configStorageObject().setEncodedGoConfig(this0.configObject().encodedConfig());

            this0.configStorageObject().setBoardSize($(".config_section .go_config_section .board_size").val());
            this0.configStorageObject().setStoneColor($(".config_section .go_config_section .stone_color").val());
            this0.configStorageObject().setKomi($(".config_section .go_config_section .komi").val());
            this0.configStorageObject().setHandicap($(".config_section .go_config_section .handicap").val());

            this0.debug(true, "setupHtmlInput", "boardSize=" + this0.configStorageObject().boardSize() + " stoneColor=" + this0.configStorageObject().stoneColor() + " komi=" + this0.configStorageObject().komi() + " handicap=" + this0.configStorageObject().handicap());

            var theme_data = "GO";
            if (this0.configStorageObject().boardSize() < 10)
                theme_data = theme_data + 0;
            theme_data = theme_data + this0.configStorageObject().boardSize();
            //theme_data = theme_data + this0.configStorageObject().stoneColor();
            if (this0.configStorageObject().handicap() < 10)
                theme_data = theme_data + 0;
            theme_data = theme_data + this0.configStorageObject().handicap();
            if (this0.configStorageObject().komi() < 10)
                theme_data = theme_data + 0;
            theme_data = theme_data + this0.configStorageObject().komi();

            this0.phwangAjaxObject().setupSession(this0.phwangLinkObject(), this0.phwangSessionObject().hisName(), theme_data, this0.configStorageObject().stoneColor());
        });
    };

    this.renderNameList = function () {
        for (var i = 0; i < this.phwangLinkObject().nameListLength(); i++) {
            $('.peer_name_paragraph select').append($('<option>', {value:this.phwangLinkObject().nameListElement(i), text:this.phwangLinkObject().nameListElement(i)}));
        }
    };

    this.gotoNextPage = function () {window.open(this.phwangLinkObject().serverHttpHeader() + "go_act.html", "_self")};
    this.objectName = function () {return "ConfigHtmlObject";};
    this.rootObject = function () {return this.theRootObject;};
    this.phwangObject = function () {return this.rootObject().phwangObject();};
    this.phwangAjaxObject = function () {return this.phwangObject().phwangAjaxObject();};
    this.phwangLinkObject = function () {return this.phwangObject().phwangLinkObject();};
    this.phwangSessionObject = function () {return this.phwangObject().phwangSessionObject();};
    this.configObject = function () {return this.rootObject().configObject();};
    this.configStorageObject = function () {return this.rootObject().configStorageObject();};
    this.debug = function (debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function (str1_val, str2_val) {this.rootObject().logit_(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function (str1_val, str2_val) {this.rootObject().abend_(this.objectName() + "." + str1_val, str2_val);};
    this.init__(root_object_val);
}
