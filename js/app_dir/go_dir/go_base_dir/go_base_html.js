/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoBaseHtmlObject(root_object_val) {
    this.init__ = function(root_object_val) {
        this.theRootObject = root_object_val;
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

    this.rootObject = function() {return this.theRootObject;};
    this.linkId = function() {return this.rootObject().linkId();};
    this.myName = function() {return this.rootObject().myName();};
    this.timeStamp = function() {return this.rootObject().timeStamp();};
    this.fabricObject = function() {return this.rootObject().fabricObject();};
    this.init__(root_object_val);
};
