/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.createKinds();
        this.setupKindsSelectors();
        //this.setupQuerySelectors();
    }


    let kinds = ["素食", "開胃菜", "小籠包", "餃類&燒賣", "大包", "湯品", "盤菜", "湯麵", "乾拌麵", "炒飯", "餛飩"];

    this.createKinds = () => {


    	for (let i = 0; i < 1; i++) {
        	let btn = document.createElement("button");
        	btn.innerHTML = kinds[i];
        	btn.className = "register_button";
        	document.body.appendChild(btn);
	    }
/*
        for (let i = 0; i < kinds.length; i++) {
        	let btn = document.createElement("button");
        	btn.innerHTML = kinds[i];
        	btn.className = ENCODE.encodeNumber(i, 2) + "_kinds_button";
        	console.log(btn.className);
        	document.body.appendChild(btn);
        }
        */
	}

    this.setupKindsSelectors = () => {
        document.querySelector(".register_button").addEventListener("click", function() {
            window.open("account_register.html", "_self");
        });

    	/*
        for (let i = 0; i < kinds.length; i++) {
        	document.querySelector("." + ENCODE.encodeNumber(i, 2) + "_kinds_button").addEventListener("click", function() {
            	window.open("go_solo.html", "_self");
        	});
        }
*/

    };









    this.setupQuerySelectors = function() {
        const theme_type = FE_DEF.THEME_IS_GO_GAME();
        const theme_data = this.encodeGoConfig(19, 0, 0, 1);

        const this0 = this;
        document.querySelector(".solo_button").addEventListener("click", function() {
            window.open("go_solo.html", "_self");
        });

        document.querySelector(".duet_button").addEventListener("click", function() {
            window.open("go_duet.html", "_self");
        });

        document.querySelector(".ensemble_button").addEventListener("click", function() {
            window.open("go_ensemble.html", "_self");
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
