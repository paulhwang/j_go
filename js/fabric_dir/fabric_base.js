/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricBaseObject(root_obj_val) {
    "use strict";
     this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.dFabricObj_ = new DFabricObject(this);
        this.uFabricObj_ = new UFabricObject(this);
    };

    this.validValue = (val) => {return (val !== null) && (val !== "null") && (val !== undefined);};
    this.validStorage = (val) => {const v = sessionStorage.getItem(val); return (v !== null) && (v !== "null") && (v !== undefined);};
    this.dFabricObj = () => this.dFabricObj_;
    this.uFabricObj = () => this.uFabricObj_;
    this.linkObj = () => this.uFabricObj().linkObj();
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.configObj = () => this.configObj_;
    this.init__(root_obj_val);
};
