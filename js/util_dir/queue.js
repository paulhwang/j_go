/*
  Copyrights reserved
  Written by Paul Hwang
*/

function QueueClass(max_queue_len_val) {
    "use strict";
    this.init__ = () => {
        this.maxQueueLen_ = max_queue_len_val;
        this.queueLen_ = 0;
        this.queueArray_ = [this.maxQueueLen()];
    };

    this.enqueueData = (data_val) => {
        if (this.queueLen() >= this.maxQueueLen()) {
            console.log("QueueClass.enqueueData() queue full length=" + this.queueLen());
            abend();
            return;
        }

        this.queueArray()[this.queueLen()] = data_val;
        this.incrementQueueLength();
    };

    this.dequeueData = () => {
        if (this.queueLen() === 0) {
            return null;
        }

        const data = this.queueArray()[0];
        this.decrementQueueLength();

        for (let i = 0; i < this.queueLen(); i++) {
            this.queueArray()[i] = this.queueArray()[i + 1];
        }
        return data;
    };

    this.incrementQueueLength = () => {this.queueLen_ += 1};
    this.decrementQueueLength = () => {this.queueLen_ -= 1};
    this.maxQueueLen = () => this.maxQueueLen_;
    this.queueLen = () => this.queueLen_;
    this.queueArray = () => this.queueArray_;
    this.init__();
}
