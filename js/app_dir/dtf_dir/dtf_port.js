/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfPortObject(root_val) {
    "use strict";
    this.init__ = function(root_val) {
        this.rootObj_ = root_val;
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.receiveFabricResponse = function(command_val, data_val, more_data_exist_val) {
        if (command_val === FE_DEF.READ_FILE_RESPONSE()) {
            console.log("DtfPortObject.receiveFabricResponse() command=" + command_val + " data=" + data_val);
        }

        else if (command_val === FE_DEF.GET_LINK_DATA_RESPONSE()) {} else if (command_val === FE_DEF.GET_NAME_LIST_RESPONSE()) {} else {console.log("bad command=" + command_val); abend();}
    };

    this.getLinkDataResponse = function (data_val) {
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObject().linkObject();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.init__(root_val);
}
