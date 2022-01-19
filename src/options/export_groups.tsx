import React from "react";
import { exportData } from "../functionality/groups_data";
import { ClipboardIcon, DownloadIcon } from "./icons";

export function ExportGroups() {
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
    return (
        <div className="export">
            <div onClick={copyToClipboard}>
                <ClipboardIcon/>
                <div className="text">Copy to Clipboard</div>
            </div>
            <div onClick={download}>
                <DownloadIcon/>
                <div className="text">Download as JSON</div>
            </div>
        </div>
    );
}