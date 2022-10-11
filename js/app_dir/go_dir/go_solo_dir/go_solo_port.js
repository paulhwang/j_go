/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObj_ = root_val;
    };

    this.rootObj = () => this.rootObj_;
    this.fabricRequestObj = () => this.rootObj().fabricRequestObject();
    this.fabricResponseObj = () => this.rootObj().fabricResponseObject();
    this.init__(root_val);
}
