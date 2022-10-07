/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricRequestObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
    };

    this.rootObject = () => this.rootObject_;
    this.init__(root_object_val);
};
