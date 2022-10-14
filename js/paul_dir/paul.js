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

