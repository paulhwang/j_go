/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseObject() {
    document.querySelector(".solo_button").addEventListener("click", function() {
        window.open("go_config.html", "_self");
    });

    document.querySelector(".play_with_button").addEventListener("click", function() {
        window.open("go_config.html", "_self");
    });

    document.querySelector(".exit_button").addEventListener("click", function() {
        window.history.go(-1);
    });
};

var go_base_main = function() {"use strict"; new GoBaseObject();};
$(document).ready(go_base_main);
