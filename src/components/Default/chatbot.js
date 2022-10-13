import React, { Component } from "react";

class KommunicateChat extends Component {

    componentDidMount() {

        (function (d, m) {
            var kommunicateSettings = { "appId": "11ecc279fd6a6f32bbbf576253d59fda9", "popupWidget": true, "automaticChatOpenOnNavigation": true };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});

    }

    render() {
        return (
            <div id="mck-sidebox-launcher" className="mck-sidebox-launcher mck-sidebox-launcher-hide"></div>
        );
    }
}
export default KommunicateChat;