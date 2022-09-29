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
            this0.fabricObject().sendSetupSoloSessionRequest();
        });

        document.querySelector(".play_with_button").addEventListener("click", function() {
            this0.fabricObject().sendSetupGroupSessionRequest(this0.myName());
        });

        document.querySelector(".exit_button").addEventListener("click", function() {
            window.history.go(-1);
        });
    };

    this.rootObject = () => this.rootObject_;
    this.linkId = () => this.rootObject().linkId();
    this.myName = () => this.rootObject().myName();
    this.timeStamp = () => this.rootObject().timeStamp();
    this.fabricObject = () => this.rootObject().fabricObject();
    this.init__(root_object_val);
};
