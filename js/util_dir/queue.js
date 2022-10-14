/*
  Copyrights reserved
  Written by Paul Hwang
*/

function QueueClass() {
    "use strict";
    this.init__ = () => {
        this.theMaxQueueLength = 1;
        this.theQueueLength = 0;
        this.theQueueArray = [this.maxQueueLength()];
    };

    this.enqueueData = (data_val) => {
        if (this.queueLength() >= this.maxQueueLength()) {
            console.log("QueueClass.enqueueData() queue full");
            abend();
            return;
        }
        this.queueArray()[this.queueLength()] = data_val;
        this.incrementQueueLength();
    };

    this.dequeueData = () => {
        if (this.queueLength() === 0) {
            return 0;
        }
        const data = this.queueArray()[0];
        this.decrementQueueLength();

        for (let i = 0; i < this.queueLength(); i++) {
            this.queueArray()[i] = this.queueArray()[i + 1];
        }
        return data;
    };

    this.incrementQueueLength = () => {this.theQueueLength += 1};
    this.decrementQueueLength = () => {this.theQueueLength -= 1};
    this.maxQueueLength = () => this.theMaxQueueLength;
    this.queueLength = () => this.theQueueLength;
    this.queueArray = () => this.theQueueArray;
    this.init__();
}
