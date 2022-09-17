
function HwangRootObject() {
    const go_button = document.querySelector(".go_button_class");
    go_button.addEventListener("click", function() {
        window.open("go_config.html", "_self");
    });

    const image_button = document.querySelector(".image_button_class");
    image_button.addEventListener("click", function() {
        window.open("image.html", "_self");
    });

    const mmw_button = document.querySelector(".mmw_button_class");
    mmw_button.addEventListener("click", function() {
        window.open("mmw.html", "_self");
    });

    const sign_up_button = document.querySelector(".sign_up_button_class");
    sign_up_button.addEventListener("click", function() {
        window.open("sign_up.html", "_self");
    });

    const sign_in_button = document.querySelector(".sign_in_button_class");
    sign_in_button.addEventListener("click", function() {
        window.open("go_login.html", "_self");
    });
};

document.addEventListener("DOMContentLoaded", function(){
    new HwangRootObject();
});

