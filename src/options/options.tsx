import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { exportData } from "../functionality/groups_data";
import { CurrentGroups } from "./current_groups";
import { ImportGroups } from "./import_groups";

function Options() {
    let [displayData, setDisplayData] = useState([]);
    async function refetch() {
        let data = await exportData();
        setDisplayData(JSON.parse(data));
    }
    useEffect(() => { refetch(); }, []);
    return(
        <div className="options">
            <div className="topbar"><img className="icon" src="./img/broom_icon.svg" /></div>
            <ImportGroups forceRefresh={refetch} />
            <CurrentGroups data={displayData} />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>,
    document.getElementById("root")
);