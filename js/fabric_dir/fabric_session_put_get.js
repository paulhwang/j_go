/*
  Copyrights reserved
  Written by Paul Hwang
*/

function FabricSessionPutGetObject() {
    "use strict";
     this.init__ = function() {
        this.linkObject_ = new FabricLinkObject();
        this.linkObject().getLinkInfoFromStorage();
        this.linkObject().printLinkInfo();

        this.sessionObject_ = new FabricSessionObject();
        this.sessionObject().getSessionInfoFromStorage();
        this.sessionObject().printSessionInfo();

        this.httpServiceObject_ = new FabricHttpServiceObject(this.examineResponse, this);
    }

    this.setCallbackFunc = function(func_val, object_val) {
        this.putCallbackFunc_ = func_val;
        this.putCallbackObject_ = object_val;
    };

    this.examineResponse = function(json_response_val) {
        console.log("FabricSessionPutGetObject.examineResponse() json_response_val=" + json_response_val);

        const response = JSON.parse(json_response_val);
        //console.log("FabricSessionPutGetObject.examineResponse() response.data=" + response.data);

        if (response.command === "put_session_data") {
            const data = JSON.parse(response.data);
            this.processPutSessionDataResponse(data);
        }
        else if (response.command === "get_session_data") {
            const data = JSON.parse(response.data);
            this.processGetSessionDataResponse(data);
        }
        else {
            abend();
        }
    };

    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.putCallbackFunc = () => this.putCallbackFunc_;
    this.putCallbackObject = () => this.putCallbackObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__();
};
