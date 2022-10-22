/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.htmlQueue_ = new QueueClass(2);
        this.prepareReadHtml();
    };

    this.prepareReadHtml = () => {
        this.htmlQueue().enqueueData(["preludes",   this.htmlObj().setPreludes]);
        this.htmlQueue().enqueueData(["kind_items", this.htmlObj().setKindItems]);
    };

    this.doReadHtml = () => {
        if (this.htmlQueue().queueLen() === 0) {
            this.htmlObj().startHtmlObject();
        }

        let block = this.htmlQueue().dequeueData();
        if (block !== null) {
            const file_name = block[0];
            const callback_func = block[1];
            this.portObj().readInfo(file_name, callback_func, this.doReadHtml);
        }
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().rootObj();
    this.htmlObj = () => this.rootObj().htmlObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.portObj = () => this.rootObj().portObj();
    this.htmlQueue = () => this.htmlQueue_;
    this.init__(root_obj_val);
}
