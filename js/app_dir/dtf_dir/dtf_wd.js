/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.htmlQue_ = new QueueClass(2);
        this.prepareReadHtml();
    };

    this.prepareReadHtml = () => {
        this.htmlQue().enqueueData(["preludes",   this.htmlObj().setPreludes]);
        this.htmlQue().enqueueData(["kind_items", this.htmlObj().setKindItems]);
    };

    this.doReadHtml = () => {
        if (this.htmlQue().queueLen() === 0) {
            this.htmlObj().startHtmlObject();
        }

        const e = this.htmlQue().dequeueData();
        if (e !== null) {
            this.portObj().readInfo(e[0], e[1], this.doReadHtml);
        }
    };

    this.prepareAndDoWriteHtml = () => {
        this.prepareWriteHtml();
        this.doWriteHtml();
    };

    this.prepareWriteHtml = () => {
        this.htmlQue().enqueueData(["preludes.new",   this.htmlObj().preludes()]);
        this.htmlQue().enqueueData(["kind_items.new", this.htmlObj().kindItems()]);
    };

    this.doWriteHtml = () => {
        if (this.htmlQue().queueLen() === 0) {
            this.htmlObj().startHtmlObject();
        }

        const e = this.htmlQue().dequeueData();
        if (e !== null) {
            this.portObj().writeInfo(e[0], e[1], this.doWriteHtml);
        }
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().rootObj();
    this.htmlObj = () => this.rootObj().htmlObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.portObj = () => this.rootObj().portObj();
    this.htmlQue = () => this.htmlQue_;
    this.init__(root_obj_val);
}
