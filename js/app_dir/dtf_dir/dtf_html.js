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

        //this.createItem2();
        //this.setupItem2Selectors();

        //this.createItem3();
        //this.setupItem3Selectors();

        this.createItems();
    }


    let kinds = ["素食", "開胃菜", "小籠包", "餃類&燒賣", "大包", "湯品", "盤菜", "湯麵", "乾拌麵", "炒飯", "餛飩"];

    let item0 = ["烤麩", "涼拌雲耳", "香菇素餃", "迷你豆沙包", "迷你芋泥包", "松露鮮菇盅", "什蔬炒飯"];
    let item1 = ["炸排骨", "紹興醉雞", "辣味黃瓜", "寧式黃芽菜", "乾煸四季豆"];
    let item2 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item3 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item4 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item5 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item6 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item7 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item8 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item9 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item10 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    let item11 = ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"];
    
    let items = [["烤麩", "涼拌雲耳", "香菇素餃", "迷你豆沙包", "迷你芋泥包", "松露鮮菇盅", "什蔬炒飯"],
     ["炸排骨", "紹興醉雞", "辣味黃瓜", "寧式黃芽菜", "乾煸四季豆"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"]]

    this.createKinds = () => {
    	for (let i = 0; i < kinds.length; i++) {
        	let btn = document.createElement("button");
        	btn.innerHTML = kinds[i];
        	btn.className = "k" + ENCODE.encodeNumber(i, 2) + "_kinds_button";
        	document.body.appendChild(btn);
	    }
	}

    this.setupKindsSelectors = () => {
        for (let i = 0; i < kinds.length; i++) {
	        document.querySelector(".k" + ENCODE.encodeNumber(i, 2) + "_kinds_button").addEventListener("click", function() {
            	window.open("go_solo.html", "_self");
        	});
	    }
    };

    this.createItems = () => {
    	for (let i = 0; i < items.length; i++) {
	        let p = document.createElement("p");
    	    p.innerHTML = kinds[i];
        	document.body.appendChild(p);

    		let item = items[i];
    		for (let j = 0; j < item.length; j++) {
    			console.log(item[j]);
        		let btn = document.createElement("button");
        		btn.innerHTML = item[j];
        		//btn.className = "j" + ENCODE.encodeNumber(j, 2) + "_items_button";
        		document.body.appendChild(btn);
    		}
		}
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
