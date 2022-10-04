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

        this.httpServiceObject_ = new HttpServiceObject(this.examineResponse, this);
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
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
                console.log("FabricSessionPutGetObject.examineResponse(put_session_data) succeed! session_id=", data.session_id);
                this.putCallbackFunc().bind(this.putCallbackObject())(data.result_data);
            }
            else {
                console.log("FabricSessionPutGetObject.examineResponse(put_session_data) invalid_result=" + data.result);
            }
        }
        else if (response.command === "get_session_data") {
            const data = JSON.parse(response.data);
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
                console.log("FabricSessionPutGetObject.examineResponse(get_session_data) succeed! session_id=", data.session_id);
                this.rootObject().portObject().receiveData(data.c_data);
            }
            else {
                console.log("FabricSessionPutGetObject.examineResponse(get_session_data) invalid_result=" + data.result);
            }
        }
        else {
            abend();
        }
    };

    this.sendPutSessionDataRequest = function(func_val, object_val, data_val) {
        this.setCallbackFunc(func_val, object_val);
        const output = JSON.stringify({
                command: "put_session_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: this.sessionObject().sessionId(),
                data: data_val,
                });
        console.log("FabricSessionPutGetObject.sendPutSessionDataRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.sendGetSessionDataRequest = function() {
        const output = JSON.stringify({
                command: "get_session_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: this.sessionObject().sessionId(),
                });
        console.log("FabricSessionPutGetObject.sendGetSessionDataRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.linkObject = () => this.linkObject_;
    this.sessionObject = () => this.sessionObject_;
    this.putCallbackFunc = () => this.putCallbackFunc_;
    this.putCallbackObject = () => this.putCallbackObject_;
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__();
};
