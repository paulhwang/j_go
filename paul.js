
function PaulObject() {
    document.querySelector(".go_button").addEventListener("click", function() {
        window.open("go_config.html", "_self");
    });

    document.querySelector(".image_button").addEventListener("click", function() {
        window.open("image.html", "_self");
    });

    document.querySelector(".mmw_button").addEventListener("click", function() {
        window.open("mmw.html", "_self");
    });

    document.querySelector(".sign_up_button").addEventListener("click", function() {
        window.open("sign_up.html", "_self");
    });

    document.querySelector(".sign_in_button").addEventListener("click", function() {
        window.open("go_login.html", "_self");
    });

    document.querySelector(".sign_off_button").addEventListener("click", function() {
        window.open("sign_in.html", "_self");
    });
};

document.addEventListener("DOMContentLoaded", function(){
    if (sessionStorage.ajax_packet_id === undefined) {
        sessionStorage.ajax_packet_id = 100;
    }
    new PaulObject();
});

