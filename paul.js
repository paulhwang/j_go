
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
        window.open("sign_off", "_self");
    });
};

var count = 0;
document.addEventListener("DOMContentLoaded", function(){
    console.log("count=" + count);
    count++;
    new PaulObject();
});

