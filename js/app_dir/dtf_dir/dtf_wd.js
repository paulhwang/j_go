/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.serviceQueue_ = new QueueClass(1);

        let a = ["directory", "read", "function", "x", "y", "z"];
        this.enqueueService(a);
    };

    this.enqueueService = (val) => {
        this.serviceQueue().enqueueData(val);
    };

    this.startWatchDog = (val) => {
        const this0 = this;
        this.watchDogId_ = setInterval(function (val) {
            let service = this0.serviceQueue().dequeueData();
            if (service !== null) {
                const dir = service[0];
                const r_w = service[1];
                const func = service[2];
                console.log(dir);
                console.log(r_w);
                console.log(func);
            }
        }, 1000, val);
    };

    this.stopWatchDog = () => {
        if (this.watchDogId() !== null) {
            clearInterval(this.watchDogId());
            this.watchDogId_ = null;
        }
    };

    this.rootObj = () => this.rootObj_;
    this.linkObj = () => this.rootObj().rootObj();
    this.htmlObj = () => this.rootObj().htmlObj();
    this.dFabricObj = () => this.rootObj().dFabricObj();
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.watchDogId = () => this.watchDogId_;
    this.serviceQueue = () => this.serviceQueue_;
    this.init__(root_obj_val);
}
