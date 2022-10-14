/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PaulObject() {
    "use strict";
    this.init__ = () => {
        this.createBody();
        this.bindSelectors();
    };

    this.bindSelectors = () => {
        document.querySelector(".register_button").addEventListener("click", function() {
            window.open("account_register.html", "_self");
        });

        document.querySelector(".login_button").addEventListener("click", function() {
            window.open("account_login.html", "_self");
        });


        document.querySelector(".logout_button").addEventListener("click", function() {
            window.open("account_logout.html", "_self");
        });

        document.querySelector(".go_button").addEventListener("click", function() {
            window.open("go_base.html", "_self");
        });

        document.querySelector(".old_go_button").addEventListener("click", function() {
            window.open("old_go_config.html", "_self");
        });

        document.querySelector(".old_login_button").addEventListener("click", function() {
            window.open("go_login.html", "_self");
        });

        document.querySelector(".image_button").addEventListener("click", function() {
            window.open("image.html", "_self");
        });

        document.querySelector(".mmw_button").addEventListener("click", function() {
            window.open("mmw.html", "_self");
        });

        document.querySelector(".map_button").addEventListener("click", function() {
            window.open("map.html", "_self");
        });
    };

    this.createBody = () => {
        let welcom_title = document.createElement("p");
        welcom_title.innerHTML = "Plase select the service:";
        document.body.appendChild(welcom_title);





        let account_div = document.createElement("div");
        account_div.className = "account_class";
        document.body.appendChild(account_div);

        let account_title = document.createElement("p");
        account_title.innerHTML = "Accounts:";
        document.body.appendChild(account_title);

        let register_btn = document.createElement("button");
        register_btn.innerHTML = "Register";
        register_btn.className = "register_button";
        document.body.appendChild(register_btn);

        let login_btn = document.createElement("button");
        login_btn.innerHTML = "Login";
        login_btn.className = "login_button";
        document.body.appendChild(login_btn);

        let logout_btn = document.createElement("button");
        logout_btn.innerHTML = "Logout";
        logout_btn.className = "logout_button";
        document.body.appendChild(logout_btn);




        let game_div = document.createElement("div");
        game_div.className = "game_class";
        document.body.appendChild(game_div);

        let game_title = document.createElement("p");
        game_title.innerHTML = "Games:";
        document.body.appendChild(game_title);

        let go_btn = document.createElement("button");
        go_btn.innerHTML = "Go Game";
        go_btn.className = "go_button";
        document.body.appendChild(go_btn);

        let sudoku_game_btn = document.createElement("button");
        sudoku_game_btn.innerHTML = "Sudoku";
        sudoku_game_btn.className = "sudoku_button";
        document.body.appendChild(sudoku_game_btn);

        let old_go_btn = document.createElement("button");
        old_go_btn.innerHTML = "Old Go Game";
        old_go_btn.className = "old_go_button";
        document.body.appendChild(old_go_btn);

        let old_login_btn = document.createElement("button");
        old_login_btn.innerHTML = "Old Login";
        old_login_btn.className = "old_login_button";
        document.body.appendChild(old_login_btn);







        let application_div = document.createElement("div");
        application_div.className = "application_class";
        document.body.appendChild(application_div);


        let application_title = document.createElement("p");
        application_title.innerHTML = "Applications:";
        document.body.appendChild(application_title);


        let map_btn = document.createElement("button");
        map_btn.innerHTML = "Map";
        map_btn.className = "map_button";
        document.body.appendChild(map_btn);

        let food_order_btn = document.createElement("button");
        food_order_btn.innerHTML = "Food Order";
        food_order_btn.className = "food_order_button";
        document.body.appendChild(food_order_btn);


        let mmw_btn = document.createElement("button");
        mmw_btn.innerHTML = "MM wave Radar";
        mmw_btn.className = "mmw_button";
        document.body.appendChild(mmw_btn);

        let image_btn = document.createElement("button");
        image_btn.innerHTML = "Image";
        image_btn.className = "image_button";
        document.body.appendChild(image_btn);









        let test_div = document.createElement("div");
        test_div.className = "test_class";
        document.body.appendChild(test_div);

        let test_title = document.createElement("p");
        test_title.innerHTML = "Tests:";
        document.body.appendChild(test_title);

        let test_btn = document.createElement("button");
        test_btn.innerHTML = "Test";
        test_btn.className = "test_button";
        document.body.appendChild(test_btn);




        const para = document.createElement("p");
        para.innerText = "by Paul Hwang";
        document.body.appendChild(para);
    }

    this.init__();
};

$(document).ready(() => {
    let ajax_packet_id = sessionStorage.getItem("ajax_packet_id");
    if ((ajax_packet_id === null) || (ajax_packet_id === "null") || (ajax_packet_id === undefined)) {
        sessionStorage.setItem("ajax_packet_id", 1);
        ajax_packet_id = sessionStorage.getItem("ajax_packet_id");
    }
    console.log("ajax_packet_id=" + ajax_packet_id);
    new PaulObject();
});

/*
document.addEventListener("DOMContentLoaded", function() {
    let ajax_packet_id = sessionStorage.getItem("ajax_packet_id");
    if ((ajax_packet_id === null) || (ajax_packet_id === "null") || (ajax_packet_id === undefined)) {
        sessionStorage.setItem("ajax_packet_id", 1);
        ajax_packet_id = sessionStorage.getItem("ajax_packet_id");
    }
    console.log("ajax_packet_id=" + ajax_packet_id);
    new PaulObject();
});
*/

