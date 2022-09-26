/*
  Copyrights reserved
  Written by Paul Hwang
*/

class GoConfigEncoder {
    constructor (encoded_val) {
        this.debug(true, "decodeConfig", encoded_val);
        if ((encoded_val === undefined) || (encoded_val === "")) {
            this.setBoardSize(19);
            this.setHandicapPoint(0);
            this.setKomiPoint(0);
            return;
        }
        var data;
        if (encoded_val.charAt(0) != 'G') {
            this.abend("decodeConfig", "not G");
        }
        var index = 4;
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setBoardSize(data);
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setHandicapPoint(data);
        data = (encoded_val.charAt(index++) - '0') * 10
        data += encoded_val.charAt(index++) - '0';
        this.setKomiPoint(data);
        data = encoded_val.charAt(index++) - '0';
        this.setMyColor(data);
        this.setHisName(encoded_val.slice(index));
    };

    static encode(my_name_val, board_size_val, handicap_val, komi_val, his_color_val) {
        console.log("my_name_val = " + my_name_val);
        var len = 11 + my_name_val.length;
        var buf = "G";
        if (len < 100) buf = buf + 0; if (len < 10) buf = buf + 0; buf = buf + len;
        if (board_size_val < 10) buf = buf + 0; buf = buf + board_size_val;
        if (handicap_val < 10) buf = buf + 0; buf = buf + handicap_val;
        if (komi_val) buf = buf + 0; buf = buf + komi_val;
        buf = buf + his_color_val;
        buf = buf + my_name_val;
        return buf;
    };
}