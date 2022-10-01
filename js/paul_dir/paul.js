/*
  Copyrights reserved
  Written by Paul Hwang
*/

function PaulObject() {
    document.querySelector(".register_button").addEventListener("click", function() {
        window.open("sign_up.html", "_self");
    });

    document.querySelector(".login_button").addEventListener("click", function() {
        window.open("sign_in.html", "_self");
    });

    document.querySelector(".logout_button").addEventListener("click", function() {
        window.open("sign_off.html", "_self");
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

document.addEventListener("DOMContentLoaded", function(){
    if (sessionStorage.ajax_packet_id === undefined) {
        sessionStorage.ajax_packet_id = 100;
        console.log("new window");
    }
    new PaulObject();
});

