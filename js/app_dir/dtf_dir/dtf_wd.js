/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.serviceQueue_ = new QueueClass(1);

        let a = ["dtf.txt", "R", "function"];
        this.enqueueService(a);
    };

    this.enqueueService = (val) => {
        this.serviceQueue().enqueueData(val);
    };

    this.startWatchDog = (val) => {
        console.log("startWatchDogstartWatchDogstartWatchDogstartWatchDogstartWattWatchDogstartWatchDogstartWatchDog");
        let service = this.serviceQueue().dequeueData();
        if (service !== null) {
            const file_name = service[0];
            const r_w = service[1];
            const callback_func = service[2];
            if (r_w === "R") {
                this.portObj().readInfo(file_name, callback_func, this.startWatchDog);
            }
        }
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
    this.portObj = () => this.rootObj().portObj();
    this.watchDogId = () => this.watchDogId_;
    this.serviceQueue = () => this.serviceQueue_;
    this.init__(root_obj_val);
}
