/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayFabricObject(root_object_val) {
    "use strict";
     this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.httpServiceObject_ = new HttpServiceObject(this.examineResponse, this);
    };

    this.examineResponse = function(json_response_val) {
        console.log("GoPlayFabricObject.examineResponse() json_response_val=" + json_response_val);

        const response = JSON.parse(json_response_val);
        //console.log("GoPlayFabricObject.examineResponse() response.data=" + response.data);

        if (response.command === "put_session_data") {
            const data = JSON.parse(response.data);
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
                console.log("GoPlayFabricObject.examineResponse(put_session_data) succeed! session_id=", data.session_id);
                this.sendGetSessionDataRequest();
            }
            else {
                console.log("GoPlayFabricObject.examineResponse(put_session_data) invalid_result=" + data.result);
            }
        }
        else if (response.command === "get_session_data") {
            const data = JSON.parse(response.data);
            if (data.result === FE_DEF.FE_RESULT_SUCCEED()) {
                console.log("GoPlayFabricObject.examineResponse(get_session_data) succeed! session_id=", data.session_id);
                this.rootObject().portObject().receiveData(data.c_data);
            }
            else {
                console.log("GoPlayFabricObject.examineResponse(get_session_data) invalid_result=" + data.result);
            }
        }
        else {
            abend();
        }
    };

    this.sendPutSessionDataRequest = function(data_val) {
        const output = JSON.stringify({
                command: "put_session_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: this.sessionObject().sessionId(),
                data: data_val,
                });
        console.log("GoBaseFabricObject.sendPutSessionDataRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.sendGetSessionDataRequest = function() {
        const output = JSON.stringify({
                command: "get_session_data",
                time_stamp: this.linkObject().timeStamp(),
                link_id: this.linkObject().linkId(),
                session_id: this.sessionObject().sessionId(),
                });
        console.log("GoBaseFabricObject.sendGetSessionDataRequest() output=" + output);
        this.httpServiceObject().sendAjaxRequest(output); 
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.sessionObject = () => this.rootObject().sessionObject();
    this.httpServiceObject = () => this.httpServiceObject_;
    this.init__(root_object_val);
};
