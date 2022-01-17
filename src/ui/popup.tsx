import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { setStored } from "../abstraction/store";
import { getTabsInGroup } from "../abstraction/tabs";
import { computeIcon, readRegistered, readUnregistered } from "../functionality/groups_store";
import { RegisteredGroups, UnregisteredGroups } from "./pages";
import { ToolBar } from "./toolbar";

function Popup() {
    // STORAGE
    let [unregisteredGroups, setUnregisteredGroups] = useState([]);
    let [registeredGroups, setRegisteredGroups] = useState([]);
    let [imgUrls, setImgUrls] = useState(null);
    // Updating pages
    async function updateUnregistered() {
        let groups = await readUnregistered();
        setImgUrls(await Promise.all(groups.map(async (group) => computeIcon(await getTabsInGroup(group.id)))));
        setUnregisteredGroups(groups);
    }
    async function updateRegistered() {
        setRegisteredGroups(await readRegistered());
    }
    useEffect(() => { updateRegistered(); }, []);

    // PAGES MANAGEMENT
    // 0 or others: Default page
    // 1: Add groups
    // 2: Remove groups
    let [page, setPage] = useState(0);
    // Button click in toolbar
    function toggleAddPage() {
        const isInAddPage = page == 1;
        isInAddPage ? updateRegistered() : updateUnregistered();
        setPage(isInAddPage ? 0 : 1);
    }
    function toggleRemoveMode() {
        const isInRemoveMode = page == 2;
        if (page != 1) {
            setPage(isInRemoveMode ? 0 : 2);
        }
    } 
    
    // UNDOING CHANGES
    let savedGroups = useRef(null);
    async function updateSaved() {
        savedGroups.current = await readRegistered();
    }
    useEffect(() => { updateSaved(); }, []);
    async function recover() {
        if (savedGroups.current) {
            let save = JSON.parse(JSON.stringify(savedGroups.current));
            await setStored("groups", save);
            setRegisteredGroups(save);
        }
    }

    return (
        <div className="popup">
            <div className="topbar"></div>
            <RegisteredGroups groups={registeredGroups} forceUpdate={updateRegistered} isInRemoveMode={page == 2} />
            <UnregisteredGroups groups={unregisteredGroups} forceUpdate={updateUnregistered} imgUrls={imgUrls} isInAddPage={page == 1} />
            <ToolBar toggleAddPage={toggleAddPage} toggleRemoveMode={toggleRemoveMode} recover={recover} />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);