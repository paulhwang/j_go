/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricBaseObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.fabricResponseObj_ = new FabricResponseObject(this);
        this.fabricRequestObj_ = new FabricRequestObject(this);
    };

    this.fabricResponseObject = () => this.fabricResponseObj_;
    this.fabricRequestObject = () => this.fabricRequestObj_;
    this.linkObj = () => this.fabricRequestObject().linkObj();
    this.sessionObj = () => this.fabricRequestObject().sessionObj();
    this.configObj = () => this.configObj_;
    this.init__(root_obj_val);
};
