/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DFabricObject(root_obj_val) {
    "use strict";
     this.init__ = (root_obj_val) => {
        this.rootObj_ = root_obj_val;
        this.httpReqObj_ = new FabricHttpReqObject(this.parseFabricResponse, this);
    };

    this.setCallbackFunc = (func_val, obj_val) => {
        this.callbackFunc_ = func_val;
        this.callbackObj_ = obj_val;
    };

    this.parseFabricResponse = (data_val) => {
        const cmd = data_val.charAt(0);
        const data = data_val.slice(1);

        if (cmd !== FE_DEF.GET_LINK_DATA_RESPONSE()) {
            console.log("DFabricObject.parseFabricResponse() cmd=" + cmd + " data=" + data_val);
        }

        if (cmd.charCodeAt(0) !== this.httpXmtObj().pendingAjaxRequestCommand().charCodeAt(0) + 32) {
            console.log("DFabricObject.parseFabricResponse() cmd=" + cmd + " pinding_cmd=" + this.httpXmtObj().pendingAjaxRequestCommand());
            abend();
        }
        this.httpXmtObj().clearPendingAjaxRequestCommand();

        let func;
             if (cmd === FE_DEF.REGISTER_RESPONSE())         func = this.registerResponse;
        else if (cmd === FE_DEF.LOGIN_RESPONSE())            func = this.loginResponse;
        else if (cmd === FE_DEF.LOGOUT_RESPONSE())           func = this.logoutResponse;
        else if (cmd === FE_DEF.GET_LINK_DATA_RESPONSE())    func = this.getLinkDataResponse;
        else if (cmd === FE_DEF.GET_NAME_LIST_RESPONSE())    func = this.getNameListResponse;
        else if (cmd === FE_DEF.SETUP_SESSION_RESPONSE())    func = this.setupSessionResponse;
        else if (cmd === FE_DEF.SETUP_SESSION2_RESPONSE())   func = this.setupSession2Response;
        else if (cmd === FE_DEF.SETUP_SESSION3_RESPONSE())   func = this.setupSession3Response;
        else if (cmd === FE_DEF.PUT_SESSION_DATA_RESPONSE()) func = this.putSessionDataResponse;
        else if (cmd === FE_DEF.GET_SESSION_DATA_RESPONSE()) func = this.getSessionDataResponse;
        else if (cmd === FE_DEF.READ_FILE_RESPONSE())        func = this.readFileResponse;
        else if (cmd === FE_DEF.READ_MORE_FILE_RESPONSE())   func = this.readMoreFileResponse;
        else if (cmd === FE_DEF.WRITE_FILE_RESPONSE())       func = this.writeFileResponse;
        else if (cmd === FE_DEF.WRITE_MORE_FILE_RESPONSE())  func = this.writeMoreFileResponse;
        else abend();

        func.bind(this)(cmd, data);
    };

    this.registerResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const my_name = data.slice(index);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("succeed");
            window.history.go(-1);
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else {
            console.log("invalid_result=" + result);
        }
    };

    this.loginResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const fabric_time_stamp = data.slice(index, index + FE_DEF.FABRIC_TIME_STAMP_SIZE());
        index += FE_DEF.FABRIC_TIME_STAMP_SIZE();
        //console.log("fabric_time_stamp=" + fabric_time_stamp);

        const encoded_my_name = data.slice(index);
        const encoded_my_name_length = ENCODE.decodeStringGetLength(encoded_my_name);
        const my_name = ENCODE.decodeString(encoded_my_name);
        index += encoded_my_name_length;
        //console.log("my_name=" + my_name);

        const node_time_stamp = data.slice(index, index + FE_DEF.FABRIC_TIME_STAMP_SIZE());
        index += FE_DEF.FABRIC_TIME_STAMP_SIZE();
        //console.log("node_time_stamp=" + node_time_stamp);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("succeed");
            console.log("link_id=", link_id);
            this.linkObj().setLinkInfoIntoStorage(link_id, my_name, fabric_time_stamp, node_time_stamp);
            window.history.go(-1);
        }
        else if (result === FE_DEF.RESULT_PASSWORD_NOT_MATCH()) {
            console.log("password_not_match");
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("account_not_exist");
        }
        else {
            console.log("invalid_result=" + result);
        }
    };

    this.logoutResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const encoded_my_name = data.slice(index);
        const my_name = encoded_my_name;//It's ok for now

        if (result === FE_DEF.RESULT_SUCCEED()) {
            sessionStorage.setItem("link_id", null);
            sessionStorage.setItem("my_name", null);
            sessionStorage.setItem("time_stamp", null);
            console.log("succeed");
            //window.history.go(-1);
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_ALREADY_EXIST()) {
            console.log("account_name_already_exist");
        }
        else if (result === FE_DEF.RESULT_TIME_STAMP_NOT_MATCH()) {
            console.log("time_stamp_not_match");
        }
        else {
            console.log("invalid_result=" + result);
        }
    };

    this.getLinkDataResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        let remaining_data = data.slice(index);

        while (remaining_data.length > 0) {
            let index = 0;
            let type = remaining_data.charAt(index);
            //console.log("DFabricObject.getLinkDataResponse() type=" + type);
            index++;

            if (type === FE_DEF.GET_LINK_DATA_TYPE_NAME_LIST()) {
                const name_list_tag = remaining_data.slice(index, index + FE_DEF.NAME_LIST_TAG_SIZE());
                index += FE_DEF.NAME_LIST_TAG_SIZE();

                this.linkObj().setServerNameListTag(name_list_tag);

                //console.log("DFabricObject.getLinkDataResponse() name_list_tag=" + name_list_tag);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_DATA()) {
                let session_id = remaining_data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
                index += FE_DEF.SESSION_ID_SIZE();

                console.log("DFabricObject.getLinkDataResponse() session_id=" + session_id);

                this.httpXmtObj().pendingSessionDataQueueObj().enqueueData(session_id);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_SESSION2()) {
                let len_str = remaining_data.slice(index, index + FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                index += FE_DEF.GET_LINK_DATA_LENGTH_SIZE();

                let len = ENCODE.decodeNumber(len_str, FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                let pending_session2 = remaining_data.slice(index, index + len);
                index += len;

                const session_id = pending_session2.slice(0, FE_DEF.SESSION_ID_SIZE());
                this.uFabricObj().setupSession2Request(session_id, 'Y');

                console.log("DFabricObject.getLinkDataResponse() pending_session2=" + pending_session2);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_SESSION3()) {
                let len_str = remaining_data.slice(index, index + FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                index += FE_DEF.GET_LINK_DATA_LENGTH_SIZE();

                let len = ENCODE.decodeNumber(len_str, FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                let pending_session3 = remaining_data.slice(index, index + len);
                index += len;

                this.uFabricObj().setupSession3Request(pending_session3);

                console.log("DFabricObject.getLinkDataResponse() pending_session3=" + pending_session3);
            }

            remaining_data = remaining_data.slice(index);
        }

        if (remaining_data.length !== 0) {
            console.log("DFabricObject.getLinkDataResponse() remaining_data.length=" + remaining_data.length);
            abend();
        }
    };

    this.getNameListResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const name_list_tag = data.slice(index, index + FE_DEF.NAME_LIST_TAG_SIZE());
        index += FE_DEF.NAME_LIST_TAG_SIZE();
        console.log("DFabricObject.getNameListResponse() name_list_tag=" + name_list_tag);

        const name_list_data = data.slice(index);
        console.log("DFabricObject.getNameListResponse() name_list_data=" + name_list_data);

        const name_list_array = JSON.parse("[" + name_list_data + "]");
        console.log("DFabricObject.getNameListResponse() name_list_array=" + name_list_array);

        this.linkObj().setNameListTag(name_list_tag);
        this.linkObj().setNameList(name_list_array);
        this.callbackFunc().bind(this.callbackObj())(cmd_val, data_val);
    };

    this.setupSessionResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.setupSessionResponse() succeed! session_id=", data_val.session_id);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result);
        }
        else if (result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("DFabricObject.setupSessionResponse() almost_succeed");
            this.fabricRequestObject().setupSession3Request(session_id);
        }
        else if (result === FE_DEF.RESULT_WAITING_FOR_ANSWER()) {
            console.log("DFabricObject.setupSessionResponse() waiting_for_answer");
            //this.fabricRequestObject().setupSession3Request(session_id);
        }
        else if (result === FE_DEF.RESULT_ACCOUNT_NAME_NOT_EXIST()) {
            console.log("DFabricObject.setupSessionResponse() account_not_exist");
        }
        else {
            console.log("DFabricObject.setupSessionResponse() invalid_result=" + result);
        }
    };

    this.setupSession2Response = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        const theme_type = data.charAt(index);
        index++;

        const theme_info = data.slice(index);


        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.setupSession2Response() succeed! session_id=", session_id);
        }
        else if (result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("DFabricObject.setupSession2Response() almost_succeed");
            this.sendSetupSession3Request(session_id);
        }
        else {
            console.log("DFabricObject.setupSession2Response() invalid_result=" + result);
        }
    };

    this.setupSession3Response = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        const room_status = data[index++];
        const group_mode = data[index++];
        const theme_type = data[index++];

        const encoded_theme_data = data.slice(index);
        console.log("theme=" + encoded_theme_data);
        const theme_data = ENCODE.decodeString(encoded_theme_data);
        const theme_data_len = ENCODE.decodeStringGetLength(encoded_theme_data);
        index += theme_data_len;

        const encoded_first_fiddle = data.slice(index);
        const first_fiddle = ENCODE.decodeString(encoded_first_fiddle);
        const first_fiddle_len = ENCODE.decodeStringGetLength(encoded_first_fiddle);
        index += first_fiddle_len;

        const encoded_second_fiddle = data.slice(index);
        const second_fiddle = ENCODE.decodeString(encoded_second_fiddle);
        const second_fiddle_len = ENCODE.decodeStringGetLength(encoded_second_fiddle);
        index += second_fiddle_len;

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.setupSession3Response() succeed! session_id=", session_id);
            if (room_status === FE_DEF.ROOM_STATUS_READY()) {
                this.sessionObj().setSessionInfoIntoStorage(session_id, group_mode, theme_type, theme_data, first_fiddle, second_fiddle);
                this.callbackFunc().bind(this.callbackObj())(cmd_val, result);
            }
            else {
            }
        }
        else if (result === FE_DEF.RESULT_ALMOST_SUCCEED()) {
            console.log("DFabricObject.setupSession3Response() almost_succeed");
            this.sendSetupSession3Request(session_id);
        }
        else {
            console.log("DFabricObject.setupSession3Response() invalid_result=" + result);
        }
    };

    this.putSessionDataResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        const more_ajx_id = data.charAt(index);
        index++;

        const theme_type = data.charAt(index);
        index++;

        const result_data = data.slice(index);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.putSessionDataResponse() succeed! session_id=", session_id);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result, result_data);
        }
        else {
            console.log("DFabricObject.putSessionDataResponse() invalid_result=" + result);
        }
    };

    this.getSessionDataResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        const result_data = data.slice(index);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.getSessionDataResponse() succeed! session_id=", session_id);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result, result_data);
        }
        else {
            console.log("DFabricObject.getSessionDataResponse() invalid_result=" + result);
        }
    };

    this.readFileResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const more_data_exist = data.charAt(index);
        index += 1;

        let fd;
        if (more_data_exist === "Y") {
            fd = data.slice(index, index + FE_DEF.FD_LEN_SIZE());
            index += FE_DEF.FD_LEN_SIZE();
        }

        const result_data = data.slice(index);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            //console.log("DFabricObject.readFileResponse() succeed! result_data=" + result_data + " more=" + more_data_exist + " fd=" + fd);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result, result_data, more_data_exist, fd);
        }
        else {
            console.log("DFabricObject.readFileResponse() invalid_result=" + result);
        }
    };

    this.readMoreFileResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const more_data_exist = data.charAt(index);
        index += 1;

        let fd;
        if (more_data_exist === "Y") {
            fd = data.slice(index, index + FE_DEF.FD_LEN_SIZE());
            index += FE_DEF.FD_LEN_SIZE();
        }

        const result_data = data.slice(index);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            //console.log("DFabricObject.readMoreFileResponse() succeed! result_data=" + result_data + " more=" + more_data_exist + " fd=" + fd);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result, result_data, more_data_exist, fd);
        }
        else {
            console.log("DFabricObject.reaeMoreFileResponse() invalid_result=" + result);
        }
    };

    this.writeFileResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const fd = data.slice(index, index + FE_DEF.FD_LEN_SIZE());
        index += FE_DEF.FD_LEN_SIZE();

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.writeFileResponse() succeed! fd=" + fd);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result, fd);
        }
        else {
            console.log("DFabricObject.writeFileResponse() invalid_result=" + result);
        }
    };

    this.writeMoreFileResponse = (cmd_val, data_val) => {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + FE_DEF.RESULT_SIZE());
        index += FE_DEF.RESULT_SIZE();

        const fd = data.slice(index, index + FE_DEF.FD_LEN_SIZE());
        index += FE_DEF.FD_LEN_SIZE();

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.writeMoreFileResponse() succeed! fd=" + fd);
            this.callbackFunc().bind(this.callbackObj())(cmd_val, result, fd);
        }
        else {
            console.log("DFabricObject.writeMoreFileResponse() invalid_result=" + result);
        }
    };

    this.datagramResponse = (json_response_val) => {
    };

    this.rootObj = () => this.rootObj_;
    this.responseSwitchTable = () => this.responseSwitchTable_;
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.httpXmtObj = () => this.uFabricObj().httpXmtObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.httpReqObj = () => this.httpReqObj_;
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.callbackFunc = () => this.callbackFunc_;
    this.callbackObj = () => this.callbackObj_;
    this.init__(root_obj_val);
};
