/*
  Copyrights reserved
  Written by Paul Hwang
*/

var ENCODE = new ENCODE_OBJECT;

function ENCODE_OBJECT() {
    "use strict";
    this.init__ = function() {
    }

    this.decodeNumber = function(input_val, size_val) {
        let output = 0;
        for (let index = 0; index < size_val; index++) {
            output *= 10;
            output += input_val.charAt(index) - '0';
        }
        return output;
    };

    this.decodeString = function(input_val) {
        let length = 0;
        let buf = "";
        let length_str;

        switch (input_val.charAt(0)) {
            case '1':
                length_str = input_val.slice(1, 1 + 1);
                length = this.decodeNumber(length_str, 1);
                buf = input_val.slice(1 + 1, 1 + 1 + length);
                return buf;

            case '2':
                length_str = input_val.slice(1, 1 + 2);
                length = this.decodeNumber(length_str, 2);
                buf = input_val.slice(1 + 2, 1 + 2 + length);
                return buf;

            case '3':
                length_str = input_val.slice(1, 1 + 3);
                length = this.decodeNumber(length_str, 3);
                buf = input_val.slice(1 + 3, 1 + 3 + length);
                return buf;

            case '4':
                length_str = input_val.slice(1, 1 + 4);
                length = this.decodeNumber(length_str, 4);
                buf = input_val.slice(1 + 4, 1 + 4 + length);
                return buf;

            case '5':
                length_str = input_val.slice(1, 1 + 5);
                length = this.decodeNumber(length_str, 5);
                buf = input_val.slice(1 + 5, 1 + 5 + length);
                return buf;

            default:
                console.log("ENCODE_OBJECT.decodeString() TBD");
                abend();
                return buf;
        }
    };

    this.decodeStringGetLength = function(input_val) {
        let length = 0;
        let length_str;

        switch (input_val.charAt(0)) {
            case '1':
                length_str = input_val.slice(1, 1 + 1);
                length = this.decodeNumber(length_str, 1);
                return length + 1 + 1;

            case '2':
                length_str = input_val.slice(1, 1 + 2);
                length = this.decodeNumber(length_str, 2);
                return length + 1 + 2;

            case '3':
                length_str = input_val.slice(1, 1 + 3);
                length = this.decodeNumber(length_str, 3);
                return length + 1 + 3;

            case '4':
                length_str = input_val.slice(1, 1 + 4);
                length = this.decodeNumber(length_str, 4);
                return length + 1 + 4;

            case '5':
                length_str = input_val.slice(1, 1 + 5);
                length = this.decodeNumber(length_str, 5);
                return length + 1 + 5;

            default:
                console.log("ENCODE_OBJECT.decodeStringGetLength() TBD");
                abend();
                return length;
        }
    };

    this.encodePadInteger = function(int_val, size_val) {
        if ((int_val === undefined) || (int_val === null)) {
            console.log("FabricLinkObject.encodePadInteger() null num_val");
            abend();
        }

        let str = "" + int_val;
        while (str.length < size_val) {
            str = "0" + str;
        }
        return str;
    };

    this.decodePadInteger = function(int_str_val, size_val) {
        let output = 0;
        for (let index = 0; index < size_val; index++) {
            output *= 10;
            output += int_str_val.charAt(index) - '0';
        }
        return output;
    };

    this.sleepMilliseconds = function (milliseconds_val) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds_val){
                break;
            }
        }
    };

    this.init__();
};
