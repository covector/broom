import React from "react";
import { registerGroup, StoredGroup, unregisterGroup } from "../functionality/groups_store";
import { RegisteredGroupEntry, UnregisteredGroupEntry } from "./groupEntry";

interface RegisteredGroupsProps {
    groups: StoredGroup[];
    forceUpdate: () => void;
    manualUpdate: number;
}

export function RegisteredGroups (props: RegisteredGroupsProps) {
    let groupEntries = props.groups.map((group, index) =>
        <RegisteredGroupEntry
        imgUrl={group.favIconUrl}
        color={group.color}
        title={group.title}
        id={group.id}
        key={index}
        action={async (id)=>{
            await unregisterGroup(id);
            props.forceUpdate();
        }}
        manualUpdate={props.manualUpdate}
        />
    );
    return(
        <div className="registeredGroups scrollbar">
            {groupEntries}
        </div>
    );
}

interface UnregisteredGroupsProps {
    groups: chrome.tabGroups.TabGroup[];
    imgUrls: null | string[];
    focus: boolean;
    forceUpdate: () => void;
}

export function UnregisteredGroups (props: UnregisteredGroupsProps) {
    let groupEntries = props.groups.map((group, index) => 
        <UnregisteredGroupEntry
        color={group.color}
        title={group.title}
        imgUrl={props.imgUrls ? props.imgUrls[index] : ""}
        id={group.id}
        key={index}
        action={async (id) => {
            await registerGroup(id);
            props.forceUpdate();
        }}
        />
    );
    return(
        <div className="unregisteredGroups scrollbar" style={{transform: `translateY(${props.focus ? 0 : 100}%)`}}>
            {groupEntries}
        </div>
    );
}