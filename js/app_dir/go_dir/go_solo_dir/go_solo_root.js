/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloRootObject() {
    "use strict";
    this.init__ = function() {
        this.fabricResponseObj_ = new FabricResponseObject(this);
        this.fabricRequestObj_ = new FabricRequestObject(this);
        this.configObj_ = new GoConfigObject(this);

        this.setupHtmlInputFunc();
        this.fabricResponseObject().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.setupHtmlInputFunc = function() {
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            let board_size = $(".config_section .go_config_section .board_size").val();
            let theme_data = this0.configObj().encodeGoSoloConfig(board_size);
            console.log("GoSoloHtmlObject.setupHtmlInputFun() board_size=" + board_size + " theme_data=" + theme_data);
            this0.fabricRequestObject().setupSessionRequest(FE_DEF.THEME_IS_GO_GAME(), theme_data, FE_DEF.GROUP_MODE_SOLO(), "N/A");
        });
    };

    this.receiveFabricResponse = function(command_val, data_val) {
        if (command_val !== "get_link_data") {
            console.log("GoPlayPortObject.receiveFabricResponse() command=" + command_val + " data=" + data_val);
        }

        if (command_val === "get_link_data") {
            if (data_val.pending_session3 != "N/A") {
                console.log("GoSoloPortObject.getLinkDataResponse() pending_session3=" + data_val.pending_session3);
                this.fabricRequestObject().setupSession3Request(data_val.pending_session3);
            }
        }

        else if (command_val === "setup_session3") {
            window.open("go_play.html", "_self");
        }

        else if (command_val === "get_link_data") {} else if (command_val === "get_name_list") {} else {console.log("bad command"); abend();}
    };

    this.fabricResponseObject = () => this.fabricResponseObj_;
    this.fabricRequestObject = () => this.fabricRequestObj_;
    this.linkObj = () => this.fabricRequestObject().linkObject();
    this.sessionObj = () => this.fabricRequestObject().sessionObject();
    this.configObj = () => this.configObj_;
    this.init__();
};

$(document).ready(() => {new GoSoloRootObject();});
