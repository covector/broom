import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { setStored } from "../abstraction/store";
import { getTabsInGroup } from "../abstraction/tabs";
import { readRegistered, readUnregistered } from "../functionality/groups_store";
import { RegisteredGroups, UnregisteredGroups } from "./pages";
import { ToolBar } from "./toolbar";

function Popup() {
    let [isAddPage, setIsAddPage] = useState(false);
    let [unregisteredGroups, setUnregisteredGroups] = useState([]);
    let [registeredGroups, setRegisteredGroups] = useState([]);
    let [imgUrls, setImgUrls] = useState(null);
    // Updating
    async function updateUnregistered() {
        let groups = await readUnregistered();
        setImgUrls(await Promise.all(groups.map(async (group) => (await getTabsInGroup(group.id))[0].favIconUrl)));
        setUnregisteredGroups(groups);
    }
    async function updateRegistered() {
        setRegisteredGroups(await readRegistered());
    }
    function toggleAddPage() {
        isAddPage ? updateRegistered() : updateUnregistered();
        setIsAddPage(!isAddPage);
    }
    useEffect(() => { updateRegistered(); }, []);
    // Revert changes
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
            <div className="topBar"></div>
            <RegisteredGroups groups={registeredGroups} forceUpdate={updateRegistered} />
            <UnregisteredGroups groups={unregisteredGroups} imgUrls={imgUrls} focus={isAddPage} forceUpdate={updateUnregistered} />
            <ToolBar toggleAddPage={toggleAddPage} recover={recover} />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);