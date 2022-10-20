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

    let a;
    let aa;
    let aaa;

    this.receiveFabricResponse = function(cmd_val, result_val, data1_val, data2_val, data3_val) {
        if (cmd_val !== FE_DEF.GET_LINK_DATA_RESPONSE()) {
            //console.log("DtfPortObject.receiveFabricResponse() cmd=" + cmd_val + " result=" + result_val + " data1=" + data1_val + " data2=" + data2_val + " data3=" + data3_val);
        }

        if (cmd_val === FE_DEF.READ_FILE_RESPONSE()) {
            const data = data1_val;
            const more = data2_val;
            const fd = data3_val;
            a = data;
            //console.log("DtfPortObject.receiveFabricResponse(read) cmd=" + cmd_val + " data=" + data + " more=" + more + " fd=" + fd);
            if (more === "Y") {
                this.uFabricObj().readMoreFileRequest(fd);
            }
        }
        else if (cmd_val === FE_DEF.READ_MORE_FILE_RESPONSE()) {
            const data = data1_val;
            const more = data2_val;
            const fd = data3_val;
            a = a + data;
            //console.log("DtfPortObject.receiveFabricResponse(read more) cmd=" + cmd_val + " data=" + data + " more=" + more + " fd=" + fd);
            if (more === "Y") {
                this.uFabricObj().readMoreFileRequest(fd);
            }
            else {
                aa = decodeURIComponent(a);
                console.log("aa=" + aa);
                aaa = JSON.parse(aa).a;
                console.log(aaa);
            }
        }
        else if (cmd_val === FE_DEF.WRITE_FILE_RESPONSE()) {
            console.log("DtfPortObject.receiveFabricResponse() cmd=" + cmd_val);
        }
        else if (cmd_val === FE_DEF.GET_NAME_LIST_RESPONSE()) {
            //this.renderNameList();
        }
        else if (cmd_val === FE_DEF.GET_LINK_DATA_RESPONSE()) {
        } 
        else {
            console.log("DtfPortObject.receiveFabricResponse() bad cmd=" + cmd_val);
            abend();
        }
    };

    this.getLinkDataResponse = function (data_val) {
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObject().linkObject();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.init__(root_val);
}
