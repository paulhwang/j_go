/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfPortObject(root_val) {
    "use strict";
    let encoded_html_data;

    this.init__ = function(root_val) {
        this.rootObj_ = root_val;
        this.dFabricObj().setCallbackFunc(this.receiveFabricResponse, this);
    };

    this.receiveFabricResponse = function(cmd_val, result_val, data1_val, data2_val, data3_val) {
        if (cmd_val !== FE_DEF.GET_LINK_DATA_RESPONSE()) {
            //console.log("DtfPortObject.receiveFabricResponse() cmd=" + cmd_val + " result=" + result_val + " data1=" + data1_val + " data2=" + data2_val + " data3=" + data3_val);
        }

        if (cmd_val === FE_DEF.READ_FILE_RESPONSE()) {
            const data = data1_val;
            const more = data2_val;
            const fd = data3_val;
            encoded_html_data = data;
            //console.log("DtfPortObject.receiveFabricResponse(read) cmd=" + cmd_val + " data=" + data + " more=" + more + " fd=" + fd);
            if (more === "Y") {
                this.uFabricObj().readMoreFileRequest(fd);
            }
        }
        else if (cmd_val === FE_DEF.READ_MORE_FILE_RESPONSE()) {
            const data = data1_val;
            const more = data2_val;
            const fd = data3_val;
            encoded_html_data = encoded_html_data + data;
            //console.log("DtfPortObject.receiveFabricResponse(read more) cmd=" + cmd_val + " data=" + data + " more=" + more + " fd=" + fd);
            if (more === "Y") {
                this.uFabricObj().readMoreFileRequest(fd);
            }
            else {
                const html_data = ENCODE.decodeHtml(encoded_html_data);

                if (this.htmlFunc() !== null) {
                    this.htmlFunc().bind(this)(html_data);
                    this.clearHtmlFunc();
                }
                else {
                    abend();
                }

                if (this.wdFunc() !== null) {
                    this.wdFunc().bind(this)(this.wdParam());
                }
                else {
                    abend();
                }
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

    this.writeInfo = (link_val, file_name_val, data_val) => {
        this.uFabricObj().writeFileRequest(link_val, file_name_val, data_val);
    };

    this.readInfo = (file_name_val, html_func_val, wd_func_val, wd_param_val) => {
        this.htmlFunc_ = html_func_val;
        this.wdFunc_ = wd_func_val;
        this.wdParam_ = wd_param_val;
        this.uFabricObj().readFileRequest(file_name_val);
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().rootObj();
    this.htmlObj = () => this.rootObj().htmlObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.htmlFunc = () => this.htmlFunc_;
    this.wdFunc = () => this.wdFunc_;
    this.wdParam = () => this.wdParam_;
    this.clearHtmlFunc = () => {this.htmlFunc_ = null;}
    this.init__(root_val);
}
