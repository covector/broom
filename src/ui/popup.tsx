import React from "react";
import ReactDOM from "react-dom";

function Popup() {
    return (
        <span>this is a popup hi</span>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);