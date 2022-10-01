/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseHtmlObject(root_object_val) {
    this.init__ = function(root_object_val) {
        this.rootObject_ = root_object_val;
        this.setupQuerySelectors();
    }

    this.setupQuerySelectors = function() {
        var this0 = this;
        document.querySelector(".solo_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupSoloRequest();
        });

        document.querySelector(".duet_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupDuetRequest(this0.linkObject().myName());
        });

        document.querySelector(".trio_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupTrioRequest(this0.linkObject().myName());
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
