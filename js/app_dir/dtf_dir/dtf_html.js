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
        this.createItems();
        this.setupItemsSelectors();
    }


    let kinds = ["素食", "開胃菜", "小籠包", "餃類&燒賣", "大包", "湯品", "盤菜", "湯麵", "乾拌麵", "炒飯", "餛飩"];
    
    let all_items = ["素食", ["烤麩", "涼拌雲耳", "香菇素餃", "迷你豆沙包", "迷你芋泥包", "松露鮮菇盅", "什蔬炒飯"],
                 "開胃菜", ["炸排骨", "紹興醉雞", "辣味黃瓜", "寧式黃芽菜", "乾煸四季豆"],
                 "小籠包", ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
                 "餃類&燒賣", ["蝦肉煎餃", "蝦仁燒賣", "菜肉蒸餃", "鮮魚蒸餃", "羊肉蒸餃", "香菇素餃", "糯肉燒賣"],
                 "大包", ["鮮肉大包", "菜肉大包", "香菇素包", "豆沙大包", "芝麻大包", "黃金流沙包"],
                 "湯品", ["元盅雞湯", "元盅牛肉湯", "紅燒牛肉湯", "酸辣湯", "蝦肉餛飩湯", "菜肉餛飩湯"],
                 "盤菜", ["高麗菜", "空心菜", "地瓜葉", "莧菜", "莧菜腐竹"],
                 "湯麵", ["紅燒牛肉麵", "元盅雞麵", "元盅牛肉麵", "紅燒牛肉湯麵", "雪菜肉絲湯麵"],
                 "乾拌麵", ["炸醬麵", "擔擔麵", "麻醬麵", "紅油燃麵", "雪菜肉絲乾拌麵"],
                 "炒飯", ["排骨蛋炒飯", "蝦仁蛋炒飯", "肉絲蛋炒飯", "蝦仁肉絲蛋炒飯", "什蔬蛋炒飯"],
                 "餛飩", ["紅油抄手（蝦肉）", "紅油抄手（菜肉）", "餛飩乾拌（蝦肉）", "餛飩乾拌（菜肉）"]];
    
    let items = [["烤麩", "涼拌雲耳", "香菇素餃", "迷你豆沙包", "迷你芋泥包", "松露鮮菇盅", "什蔬炒飯"],
    			 ["炸排骨", "紹興醉雞", "辣味黃瓜", "寧式黃芽菜", "乾煸四季豆"],
     			 ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"],
     			 ["蝦肉煎餃", "蝦仁燒賣", "菜肉蒸餃", "鮮魚蒸餃", "羊肉蒸餃", "香菇素餃", "糯肉燒賣"],
     			 ["鮮肉大包", "菜肉大包", "香菇素包", "豆沙大包", "芝麻大包", "黃金流沙包"],
     			 ["元盅雞湯", "元盅牛肉湯", "紅燒牛肉湯", "酸辣湯", "蝦肉餛飩湯", "菜肉餛飩湯"],
     			 ["高麗菜", "空心菜", "地瓜葉", "莧菜", "莧菜腐竹"],
     			 ["紅燒牛肉麵", "元盅雞麵", "元盅牛肉麵", "紅燒牛肉湯麵", "雪菜肉絲湯麵"],
     			 ["炸醬麵", "擔擔麵", "麻醬麵", "紅油燃麵", "雪菜肉絲乾拌麵"],
     			 ["排骨蛋炒飯", "蝦仁蛋炒飯", "肉絲蛋炒飯", "蝦仁肉絲蛋炒飯", "什蔬蛋炒飯"],
     			 ["紅油抄手（蝦肉）", "紅油抄手（菜肉）", "餛飩乾拌（蝦肉）", "餛飩乾拌（菜肉）"]];

    this.createKinds = () => {
    	for (let i = 0; i < kinds.length; i++) {
        	let btn = document.createElement("button");
        	btn.innerHTML = kinds[i];
        	btn.className = "kind" + ENCODE.encodeNumber(i, 2) + "_kind_button";
        	document.body.appendChild(btn);
	    }
	}

    this.setupKindsSelectors = () => {
        for (let i = 0; i < kinds.length; i++) {
	        document.querySelector(".kind" + ENCODE.encodeNumber(i, 2) + "_kind_button").addEventListener("click", function() {
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
        		let btn = document.createElement("button");
        		btn.innerHTML = item[j];
        		btn.className = "item" + ENCODE.encodeNumber(i, 2)+ ENCODE.encodeNumber(j, 2) + "_item_button";
        		document.body.appendChild(btn);
    		}
		}
    };

    this.setupItemsSelectors = () => {
    	for (let i = 0; i < items.length; i++) {
    		let item = items[i];
    		for (let j = 0; j < item.length; j++) {
	        	document.querySelector(".item" + ENCODE.encodeNumber(i, 2) + ENCODE.encodeNumber(j, 2) + "_item_button").addEventListener("click", function() {
            		window.open("go_solo.html", "_self");
        		});
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
