/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoMoveObject(str_val, x_val, y_val, color_val, turn_val, root_object_val) {
    "use strict";
    this.init__ = function(str_val, x_val, y_val, color_val, root_object_val) {
        this.rootObject_ = root_object_val;
        if (!str_val) {
            this.x_ = x_val;
            this.y_ = y_val;
            this.color_ = color_val;
            this.turnIndex_ = turn_val;
        } else {
            this.moveObjectDecode(str_val);
        }
        console.log("GoMoveObject.init__() (" + this.xX() + "," + this.yY() + ") color=" + this.color() + " turn=" + this.turnIndex());
    };

    this.encodeMove = function() {
        let buf = "";
        if (this.xX() < 10) {
          buf = buf + 0;
        } 
        buf = buf + this.xX();

        if (this.yY() < 10) {
          buf = buf + 0;
        }
        buf = buf + this.yY();

        buf = buf + this.color();

        if (this.turnIndex() < 100) {
          buf = buf + 0;
        } 
        if (this.turnIndex() < 10) {
          buf = buf + 0;
        }
        buf = buf + this.turnIndex();

        return buf;
    };

    this.moveObjectDecode = function(str_val) {
        let index = 0;
        this.x_ = (str_val.charAt(index++) - '0') * 10;
        this.x_ += (str_val.charAt(index++) - '0');
        this.y_ = (str_val.charAt(index++) - '0') * 10;
        this.y_ += (str_val.charAt(index++) - '0');
        this.color_ = (str_val.charAt(index++) - '0');
        this.turnIndex_ = (str_val.charAt(index++) - '0') * 100;
        this.turnIndex_ += (str_val.charAt(index++) - '0') * 10;
        this.turnIndex_ += (str_val.charAt(index++) - '0');
    };

    this.rootObject = () => this.rootObject_;
    this.xX = () => this.x_;
    this.yY = () => this.y_;
    this.color = () => this.color_;
    this.turnIndex = () => this.turnIndex_;
    this.init__(str_val, x_val, y_val, color_val, root_object_val);
}
