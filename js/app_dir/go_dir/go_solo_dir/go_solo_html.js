/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoSoloHtmlObject(root_obj_val) {
    "use strict";
    this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObject().linkObject();
    this.fabricRequestObj = () => this.rootObj().fabricRequestObject();
    this.portObj = () => this.rootObj().portObject();
    this.configObj = () => this.rootObj().configObject();
    this.init__(root_obj_val);
};
