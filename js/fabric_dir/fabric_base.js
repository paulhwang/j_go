/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricBaseObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.dFabricObj_ = new DFabricObject(this);
        this.uFabricObj_ = new UFabricObject(this);
    };

    this.DFabricObj = () => this.dFabricObj_;
    this.UFabricObj = () => this.uFabricObj_;
    this.linkObj = () => this.UFabricObj().linkObj();
    this.sessionObj = () => this.UFabricObj().sessionObj();
    this.configObj = () => this.configObj_;
    this.init__(root_obj_val);
};
