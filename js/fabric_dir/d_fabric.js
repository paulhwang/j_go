/*
  Copyrights reserved
  Written by Paul Hwang
*/

function DFabricObject(root_obj_val) {
    "use strict";
     this.init__ = function(root_obj_val) {
        this.rootObj_ = root_obj_val;
        this.initSwitchTable();
        this.httpReqObj_ = new FabricHttpReqObject(this.parseFabricResponse, this);
    };

    this.setCallbackFunc = function(func_val, obj_val) {
        this.callbackFunc_ = func_val;
        this.callbackObj_ = obj_val;
    };

    this.initSwitchTable = function() {
        this.responseSwitchTable_ = {
            'r': this.registerResponse,
            'i': this.loginResponse,
            'o': this.logoutResponse,
            'd': this.getLinkDataResponse,
            'n': this.getNameListResponse,
            's': this.setupSessionResponse,
            'y': this.setupSession2Response,
            'z': this.setupSession3Response,
            'p': this.putSessionDataResponse,
            'g': this.getSessionDataResponse,
            'm': this.datagramResponse,
        };
    };

    this.parseFabricResponse = function(data_val) {
        const command = data_val.charAt(0);
        const data = data_val.slice(1);

        if (command !== 'd') {
            console.log("DFabricObject.parseFabricResponse() command=" + command + " data=" + data_val);
        }

        const func = this.responseSwitchTable()[command];
        if (!func) {
            console.log("DFabricObject.parseFabricResponse() bad_command=" + command);
            abend();
            return;
        }

        this.uPortObj().clearPendingAjaxRequestCommand();

        func.bind(this)(data);
    };

    this.registerResponse = function(data_val) {
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

    this.loginResponse = function(data_val) {
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

    this.logoutResponse = function(data_val) {
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

    this.getLinkDataResponse = function(data_val) {
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
                let pending_data = remaining_data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
                index += FE_DEF.SESSION_ID_SIZE();

                this.uFabricObj().getSessionDataRequest();

                console.log("DFabricObject.getLinkDataResponse() pending_data=" + pending_data);
            }

            else if (type === FE_DEF.GET_LINK_DATA_TYPE_PENDING_SESSION2()) {
                let len_str = remaining_data.slice(index, index + FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                index += FE_DEF.GET_LINK_DATA_LENGTH_SIZE();

                let len = ENCODE.decodeNumber(len_str, FE_DEF.GET_LINK_DATA_LENGTH_SIZE());
                let pending_session2 = remaining_data.slice(index, index + len);
                index += len;

                const session_id = pending_session2.slice(0, FE_DEF.SESSION_ID_SIZE());
                this.uFabricObj().setupSession2Request(session_id);

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

    this.getNameListResponse = function(data_val) {
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
        this.callbackFunc().bind(this.callbackObj())("get_name_list", data_val);
    };

    this.setupSessionResponse = function(data_val) {
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

    this.setupSession2Response = function(data_val) {
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

    this.setupSession3Response = function(data_val) {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + 2);
        index += 2;

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + 8);
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
                this.callbackFunc().bind(this.callbackObj())("setup_session3");
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

    this.putSessionDataResponse = function(data_val) {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + 2);
        index += 2;

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
            this.callbackFunc().bind(this.callbackObject())("put_session_data", result_data);
        }
        else {
            console.log("DFabricObject.putSessionDataResponse() invalid_result=" + result);
        }
    };

    this.getSessionDataResponse = function(data_val) {
        const data = data_val;
        let index = 0;

        const result = data.slice(index, index + 2);
        index += 2;

        const link_id = data.slice(index, index + FE_DEF.LINK_ID_SIZE());
        index += FE_DEF.LINK_ID_SIZE();

        const session_id = data.slice(index, index + FE_DEF.SESSION_ID_SIZE());
        index += FE_DEF.SESSION_ID_SIZE();

        const result_data = data.slice(index);

        if (result === FE_DEF.RESULT_SUCCEED()) {
            console.log("DFabricObject.getSessionDataResponse() succeed! session_id=", session_id);
            this.callbackFunc().bind(this.callbackObj())("get_session_data", result_data);
        }
        else {
            console.log("DFabricObject.getSessionDataResponse() invalid_result=" + result);
        }
    };

    this.datagramResponse = function(json_response_val) {
    };

    this.rootObj = () => this.rootObj_;
    this.responseSwitchTable = () => this.responseSwitchTable_;
    this.uFabricObj = () => this.rootObj().uFabricObj();
    this.uPortObj = () => this.uFabricObj().uPortObj();
    this.linkObj = () => this.uFabricObj().linkObj();
    this.httpReqObj = () => this.httpReqObj_;
    this.sessionObj = () => this.uFabricObj().sessionObj();
    this.callbackFunc = () => this.callbackFunc_;
    this.callbackObj = () => this.callbackObj_;
    this.init__(root_obj_val);
};
