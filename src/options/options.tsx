import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { exportData, importData } from "../functionality/groups_data";

function Options() {
    let textBoxRef = useRef(null);
    async function importFromText() {
        let data: string = textBoxRef.current.value;
        if (data) {
            let success = await importData(data);
            if (success) {
                alert("Import Successful!");
            } else {
                alert("Import Failed.")
            }
        }
    }
    async function copyToClipboard() {
        let data = await exportData();
        navigator.clipboard.writeText(data);
    }
    async function download() {
        let data = await exportData();
        var blob = new Blob([data], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url,
            filename: "broom_data.json"
        }, () => URL.revokeObjectURL(url));
    }
    return(
        <div>
            <textarea ref={textBoxRef}></textarea>
            <button onClick={importFromText}>Import</button>
            <br />
            <button onClick={copyToClipboard}>Copy to clipboard</button>
            <button onClick={download}>Download as json</button>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>,
    document.getElementById("root")
);