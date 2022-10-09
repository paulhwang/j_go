/*
  Copyrights reserved
  Written by Paul Hwang
*/

function HttpXmtClass(fab_request_obj_val) {
    "use strict";
    this.init__ = function(fab_request_obj_val) {
        this.fabRequestObj_ = fab_request_obj_val;
    };

    this.fabRequestObj = () => this.fabRequestObj_;
    this.init__(fab_request_obj_val);
}
