import React, { useRef, useState } from "react";
import { importData } from "../functionality/groups_data";
import { ImportIcon } from "./icons";

export function ImportGroups(props) {
    let textBoxRef = useRef(null);
    let [syncStorage, setSyncStorage] = useState(false);
    async function importFromText() {
        let data: string = textBoxRef.current.value;
        if (data) {
            let success = await importData(data, syncStorage);
            if (success) {
                props.forceRefresh();
                alert("Import Successful!");
            } else {
                alert("Import Failed.")
            }
        }
    }
    return (
        <div className="import">
            <h1 className="import-title">Importing Data</h1>
            <textarea className="import-textbox" ref={textBoxRef}></textarea>
            <div className="import-control">
                <div className="sync-select">
                    <div className="sync-text">local</div>
                    <div className={"sync-button " + (syncStorage ? "sync" : "local")} onClick={() => { setSyncStorage(!syncStorage); }}><div></div></div>
                    <div className="sync-text">sync</div>
                </div>
                <div className="import-button" onClick={importFromText}>
                    <ImportIcon/>
                    <div className="text">Import</div>
                </div>
            </div>
        </div>
    );
}