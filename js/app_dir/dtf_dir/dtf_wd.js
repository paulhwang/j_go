/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.htmlReadQueue_ = new QueueClass(2);
        this.htmlWriteQueue_ = new QueueClass(20);
        this.prepareReadHtml();
    };

    this.prepareReadHtml = () => {
        this.htmlReadQueue().enqueueData(["preludes",   this.htmlObj().setPreludes]);
        this.htmlReadQueue().enqueueData(["kind_items", this.htmlObj().setKindItems]);
    };

    this.doReadHtml = () => {
        if (this.htmlReadQueue().queueLen() === 0) {
            this.htmlObj().startHtmlObject();
        }

        const e = this.htmlReadQueue().dequeueData();
        if (e !== null) {
            this.portObj().readInfo(e[0], e[1]);
        }
    };

    this.prepareAndDoWriteHtml = () => {
        this.prepareWriteHtml(this.htmlObj().preludes(), "preludes.new");
        this.prepareWriteHtml(this.htmlObj().kindItems(), "kind_items.new");
        this.doWriteHtml(0);
    };

    this.prepareWriteHtml = (data_val, file_name_val) => {
        const whole_data = ENCODE.encodeHtml(data_val);
        if (whole_data.length <= FE_DEF.MAX_FILE_IO_BUF_SIZE()) {
            this.htmlWriteQueue().enqueueData(["O", "Y", whole_data, file_name_val]);
            return;
        }
        else {
            let data = whole_data.slice(0, FE_DEF.MAX_FILE_IO_BUF_SIZE());
            this.htmlWriteQueue().enqueueData(["O", "N", data, file_name_val]);
            let rest_data = whole_data.slice(FE_DEF.MAX_FILE_IO_BUF_SIZE());

            while (rest_data.length > 0) {
                if (rest_data.length <= FE_DEF.MAX_FILE_IO_BUF_SIZE()) {
                    this.htmlWriteQueue().enqueueData(["M", "Y", rest_data, null]);
                    return;
                }
                else {
                    let data = rest_data.slice(0, FE_DEF.MAX_FILE_IO_BUF_SIZE());
                    rest_data = rest_data.slice(FE_DEF.MAX_FILE_IO_BUF_SIZE());
                    this.htmlWriteQueue().enqueueData(["M", "N", data, null]);
                }
            }
        }

    };

    this.doWriteHtml = (fd_val) => {
        const e = this.htmlWriteQueue().dequeueData();
        if (e !== null) {
            this.portObj().writeInfo(e[0], e[1], e[2], e[3], fd_val);
        }
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().rootObj();
    this.htmlObj = () => this.rootObj().htmlObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.portObj = () => this.rootObj().portObj();
    this.htmlReadQueue = () => this.htmlReadQueue_;
    this.htmlWriteQueue = () => this.htmlWriteQueue_;
    this.init__(root_obj_val);
}
