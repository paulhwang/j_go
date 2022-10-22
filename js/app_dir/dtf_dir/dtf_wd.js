/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.serviceQueue_ = new QueueClass(2);
        this.prepareReadHtml();
    };

    this.prepareReadHtml = () => {
        this.serviceQueue().enqueueData(["preludes",   this.htmlObj().setPreludes]);
        this.serviceQueue().enqueueData(["kind_items", this.htmlObj().setKindItems]);
    };

    this.doReadHtml = () => {
        if (this.serviceQueue().queueLen() === 0) {
            this.htmlObj().startHtmlObject();
        }

        let service = this.serviceQueue().dequeueData();
        if (service !== null) {
            const file_name = service[0];
            const callback_func = service[1];
            this.portObj().readInfo(file_name, callback_func, this.doReadHtml);
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
