/*
  Copyrights reserved
  Written by Paul Hwang
*/

var UTILS = new UTILS_OBJECT;

function UTILS_OBJECT() {
    "use strict";
    this.init__ = () => {
    }

    this.sleepMilliseconds = (milliseconds_val) => {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds_val){
                break;
            }
        }
    };

    this.validValue = (val) => {return (val !== null) && (val !== "null") && (val !== undefined);};
    this.validStorage = (val) => {const v = sessionStorage.getItem(val); return (v !== null) && (v !== "null") && (v !== undefined);};

    this.openModal = (modal_val) => {
        document.body.style.overflow = "hidden";
        modal_val.setAttribute("open", "true");
        document.addEventListener("keydown", this.escClose);
        let overlay = document.createElement("div");
        overlay.id = "modal-overlay";
        document.body.appendChild(overlay);
    };

    this.closeModal = (modal_val) => {
        document.body.style.overflow = "auto";
        modal_val.removeAttribute("open");
        document.removeEventListener("keydown", this.escClose);
        document.body.removeChild(document.getElementById("modal-overlay"));
    };

    this.escClose = (e) => {
        if (e.keyCode == 27) {
            closeModal();
        }
    };

    this.init__();
};
