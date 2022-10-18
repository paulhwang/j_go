/*let modal;
document.addEventListener("click", (e) => {
  if (e.target.className === "modal-open") {
    modal = document.getElementById(e.target.dataset.id);
    openModal(modal);
  } else if (e.target.className === "modal-close") {
    closeModal(modal);
  } else {
    return;
  }
});
*/

/*
const openModal = (modal) => {
  document.body.style.overflow = "hidden";
  modal.setAttribute("open", "true");
  document.addEventListener("keydown", escClose);
  let overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);
};

const closeModal = (modal) => {
  document.body.style.overflow = "auto";
  modal.removeAttribute("open");
  document.removeEventListener("keydown", escClose);
  document.body.removeChild(document.getElementById("modal-overlay"));
};

const escClose = (e) => {
  if (e.keyCode == 27) {
    closeModal();
  }
};
*/




/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfHtmlObject(root_obj_val) {
    "use strict";
    this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.writeInfo(this.linkObj().linkId(), "dtf.txt");
        this.readInfo("dtf.txt");
        this.bindModal();
        this.createPreludes();
        this.createKinds();
        this.setupKindsSelectors();
        this.createItems();
        this.setupItemsSelectors();

/*
        console.log(kind_items);

        let json_kind_items_package = JSON.stringify({
                        data: kind_items,
                        });
        console.log(json_kind_items_package);

        let kind_items_package = JSON.parse(json_kind_items_package);
        console.log(kind_items_package.data);


        let json_kind_items = JSON.stringify({
                        kind_items,
                        });
        console.log(json_kind_items);

        let kind_items1 = JSON.parse(json_kind_items);
        console.log(kind_items1);
*/
    }

    const preludes = [
        [["h1"], ["鼎泰豐"]],
        [["h2"], ["〈本店使用國產豬肉〉"]],
        [["p"], ["每日上午6:00開放11:30後取餐的預點餐。"]],
        [["p"], ["每餐廳營業時間開始後，才會開始製餐。"]],
        [["p"], ["餐廳接單時間為11:00-20:00。"]],
        [["p"], ["餐點均為現做，將視您所訂購的餐點數量調整取餐時間。"]],
        [["p"], ["憑訂單編號，前往鼎泰豐信義店取餐。"]],
        [["p"], ["基於餐點口味及品質，恕不提供客製化服務。"]],
        [["h2"], ["餐廳最後取餐時間為20:30。"]]];


    const kind_items = [
        [["素食"], ["烤麩", "涼拌雲耳", "香菇素餃", "迷你豆沙包", "迷你芋泥包", "松露鮮菇盅", "什蔬炒飯"]],
        [["開胃菜"], ["炸排骨", "紹興醉雞", "辣味黃瓜", "寧式黃芽菜", "乾煸四季豆"]],
        [["小籠包"], ["小籠包", "蟹粉小籠包", "雞肉小籠包", "絲瓜蝦仁小籠包", "松露小籠包"]],
        [["餃類&燒賣"], ["蝦肉煎餃", "蝦仁燒賣", "菜肉蒸餃", "鮮魚蒸餃", "羊肉蒸餃", "香菇素餃", "糯肉燒賣"]],
        [["大包"], ["鮮肉大包", "菜肉大包", "香菇素包", "豆沙大包", "芝麻大包", "黃金流沙包"]],
        [["湯品"], ["元盅雞湯", "元盅牛肉湯", "紅燒牛肉湯", "酸辣湯", "蝦肉餛飩湯", "菜肉餛飩湯"]],
        [["盤菜"], ["高麗菜", "空心菜", "地瓜葉", "莧菜", "莧菜腐竹"]],
        [["湯麵"], ["紅燒牛肉麵", "元盅雞麵", "元盅牛肉麵", "紅燒牛肉湯麵", "雪菜肉絲湯麵"]],
        [["乾拌麵"], ["炸醬麵", "擔擔麵", "麻醬麵", "紅油燃麵", "雪菜肉絲乾拌麵"]],
        [["炒飯"], ["排骨蛋炒飯", "蝦仁蛋炒飯", "肉絲蛋炒飯", "蝦仁肉絲蛋炒飯", "什蔬蛋炒飯"]],
        [["餛飩"], ["紅油抄手（蝦肉）", "紅油抄手（菜肉）", "餛飩乾拌（蝦肉）", "餛飩乾拌（菜肉）"]]];

    this.orderModel = () => this.orderModel_;

    this.bindModal = () => {
        document.addEventListener("click", (e) => {
            if (e.target.className === "modal-open") {
                this.orderModel_ = document.getElementById(e.target.dataset.id);
                UTILS.openModal(this.orderModel());
            } else if (e.target.className === "modal-close") {
                UTILS.closeModal(this.orderModel());
            } else {
                return;
            }
        });
    };

    this.writeInfo = (link_val, file_name_val) => {
        this.uFabricObj().writeFileRequest(link_val, file_name_val);
    };

    this.readInfo = (file_name_val) => {
        this.uFabricObj().readFileRequest(file_name_val);
    };

    this.createKinds = () => {
        for (let i = 0; i < kind_items.length; i++) {
            let kind_item = kind_items[i];
            let kind = kind_item[0];

            let btn = document.createElement("button");
            btn.innerHTML = kind;
            btn.className = "kind" + ENCODE.encodeNumber(i, 2) + "_kind_button";
            document.body.appendChild(btn);
        }
    }

    this.setupKindsSelectors = () => {
        const this0 = this;
        for (let i = 0; i < kind_items.length; i++) {
            document.querySelector(".kind" + ENCODE.encodeNumber(i, 2) + "_kind_button").addEventListener("click", function() {
                //window.open("go_solo.html", "_self");
                UTILS.openModal(this0.orderModel());
            });
       }
    };

    this.createPreludes = () => {
        for (let i = 0; i < preludes.length; i++) {
            let prelude = preludes[i];
            let tag = prelude[0];
            let text = prelude[1];
            let p = document.createElement(tag);
            p.innerHTML = text;
            document.body.appendChild(p);
        }
    };

    this.createItems = () => {
        for (let i = 0; i < kind_items.length; i++) {
            let kind_item = kind_items[i];
            let kind = kind_item[0];
            let item = kind_item[1];

            let p = document.createElement("p");
            p.innerHTML = kind;
            document.body.appendChild(p);

            for (let j = 0; j < item.length; j++) {
                let btn = document.createElement("button");
                btn.innerHTML = item[j];
                btn.className = "item" + ENCODE.encodeNumber(i, 2)+ ENCODE.encodeNumber(j, 2) + "_item_button";
                document.body.appendChild(btn);
            }
        }
    };

    this.setupItemsSelectors = () => {
        for (let i = 0; i < kind_items.length; i++) {
            let kind_item = kind_items[i];
            let kind = kind_item[0];
            let item = kind_item[1];
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

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().linkObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.portObj = () => this.rootObj().portObj();
    this.init__(root_obj_val);
};
