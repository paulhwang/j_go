/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.serviceQueue_ = new QueueClass(2);
        this.prepareReadService();
    };

    this.prepareReadService = () => {
        this.serviceQueue().enqueueData(["preludes",   "R", this.htmlObj().setPreludes]);
        this.serviceQueue().enqueueData(["kind_items", "R", this.htmlObj().setKindItems]);
    };

    this.doReadService = (val) => {
        if (this.serviceQueue().queueLen() === 0) {
            if (val === "R") {
                this.htmlObj().startHtmlObject();
            }
        }

        let service = this.serviceQueue().dequeueData();
        if (service !== null) {
            const file_name = service[0];
            const r_w = service[1];
            const callback_func = service[2];
            if (r_w === "R") {
                this.portObj().readInfo(file_name, callback_func, this.doReadService, val);
            }
        }
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().rootObj();
    this.htmlObj = () => this.rootObj().htmlObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.portObj = () => this.rootObj().portObj();
    this.serviceQueue = () => this.serviceQueue_;
    this.init__(root_obj_val);
}
