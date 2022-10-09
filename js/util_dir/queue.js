
function QueueClass() {
    "use strict";
    this.init__ = function() {
        this.theMaxQueueLength = 1;
        this.theQueueLength = 0;
        this.theQueueArray = [this.maxQueueLength()];
    };

    this.enqueueData = function(data_val) {
        if (this.queueLength() >= this.maxQueueLength()) {
            console.log("QueueClass.enqueueData() queue full");
            abend();
            return;
        }
        this.queueArray()[this.queueLength()] = data_val;
        this.incrementQueueLength();
    };

    this.dequeueData = function() {
        if (this.queueLength() === 0) {return 0;}
        var data = this.queueArray()[0];
        this.decrementQueueLength();
        for (var i = 0; i < this.queueLength(); i++) {this.queueArray()[i] = this.queueArray()[i + 1];}
        return data;
    };

    this.maxQueueLength = function() {return this.theMaxQueueLength};
    this.queueLength = function() {return this.theQueueLength};
    this.incrementQueueLength = function() {this.theQueueLength += 1};
    this.decrementQueueLength = function() {this.theQueueLength -= 1};
    this.queueArray = function() {return this.theQueueArray;}
    this.init__();
}
