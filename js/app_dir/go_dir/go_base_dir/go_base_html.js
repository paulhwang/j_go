/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseHtmlObject(root_object_val) {
    "use strict";
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.setupQuerySelectors();
    }

    this.setupQuerySelectors = function() {
        let this0 = this;
        document.querySelector(".solo_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupSoloRequest(FE_DEF.FE_GROUP_MODE_SOLO(), "N/A");
        });

        document.querySelector(".duet_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupSoloRequest(FE_DEF.FE_GROUP_MODE_DUET(), this0.linkObject().myName());
        });

        document.querySelector(".ensemble_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupSoloRequest(FE_DEF.FE_GROUP_MODE_ENSEMBLE(), "N/A");
        });

        document.querySelector(".exit_button").addEventListener("click", function() {
            window.history.go(-1);
        });
    };

    this.rootObject = () => this.rootObject_;
    this.linkObject = () => this.rootObject().linkObject();
    this.fabricObject = () => this.rootObject().fabricObject();
    this.init__(root_object_val);
};
