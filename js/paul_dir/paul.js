/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PaulObject() {
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

    document.querySelector(".go_login_button").addEventListener("click", function() {
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

document.addEventListener("DOMContentLoaded", function() {
    sessionStorage.clear();
    sessionStorage.setItem("ajax_packet_id", 100);
    new PaulObject();
});

