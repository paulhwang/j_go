/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function PhwangQueueClass (phwang_object_val) {
    "use strict";
    this.init__ = function (phwang_object_val) {
        this.thePhwangObject = phwang_object_val;
        this.theMaxQueueLength = 1;
        this.theQueueLength = 0;
        this.theQueueArray = [this.maxQueueLength()];
    };

    this.enqueueData = function (data_val) {
        if (this.queueLength() >= this.maxQueueLength()) {
            this.abend("enqueueData", "queue full");
            return;
        }
        this.queueArray()[0] = data_val;
        this.incrementQueueLength();
    };

    this.dequeueData = function () {
        if (this.queueLength() === 0) {
            return 0;
        }

        var data = this.queueArray()[0];
        this.decrementQueueLength();
        return data;
    };

    this.maxQueueLength = function () {return this.theMaxQueueLength};
    this.queueLength = function () {return this.theQueueLength};
    this.incrementQueueLength = function () {this.theQueueLength += 1};
    this.decrementQueueLength = function () {this.theQueueLength -= 1};
    this.queueArray = function () {return this.theQueueArray;}
    this.objectName = function() {return "PhwangQueueClass";};
    this.phwangObject = function() {return this.thePhwangObject;};
    this.debug = function(debug_val, str1_val, str2_val) {if (debug_val) {this.logit(str1_val, str2_val);}};
    this.logit = function(str1_val, str2_val) {return this.phwangObject().LOG_IT(this.objectName() + "." + str1_val, str2_val);};
    this.abend = function(str1_val, str2_val) {return this.phwangObject().ABEND(this.objectName() + "." + str1_val, str2_val);};
    this.init__(phwang_object_val);
}
