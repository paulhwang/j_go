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

    this.init__();
};
