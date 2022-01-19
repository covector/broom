import React, { useRef } from "react";
import { importData } from "../functionality/groups_data";
import { ImportIcon } from "./icons";

export function ImportGroups(props) {
    let textBoxRef = useRef(null);
    async function importFromText() {
        let data: string = textBoxRef.current.value;
        if (data) {
            let success = await importData(data);
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
            <div className="import-button" onClick={importFromText}>
                <ImportIcon/>
                <div className="text">Import</div>
            </div>
        </div>
    );
}