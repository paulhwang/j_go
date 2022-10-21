/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DtfWdObject(root_obj_val) {
    "use strict";

    this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.serviceQueue_ = new QueueClass(1);
    };

    this.startWatchDog = () => {
        const this0 = this;
        this.watchDogId_ = setInterval(function (link_val) {
            const service = this0.serviceQueue().dequeueData();
        }, 100, link_val);
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
