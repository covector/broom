import React from "react";
import { groupIsOn, toggleGroup } from "../functionality/groups_manage";
import { registerGroup, StoredGroup, unregisterGroup } from "../functionality/groups_store";
import { GroupEntry } from "./groupEntry";
import { AddIcon, RemoveIcon } from "./icons";

interface RegisteredGroupsProps {
    groups: StoredGroup[];
    forceUpdate: () => void;
    isInRemoveMode: boolean;
}

export function RegisteredGroups (props: RegisteredGroupsProps) {
    let groupEntries = props.groups.map((group, index) =>
        <GroupEntry
        color={group.color}
        title={group.title}
        imgUrl={group.favIconUrl}
        key={index}
        last={index == props.groups.length - 1}
        action={async (last)=>{
            let unmounted = false;
            if (props.isInRemoveMode) {
                await unregisterGroup(group.id);
                unmounted = last;
            }
            else {
                await toggleGroup(group.id);
            }
            await props.forceUpdate();
            return !unmounted;
        }}
        checkOn={async () => {
            return await groupIsOn(group.id);
        }}
        className={props.isInRemoveMode ? "remove registered" : "registered"}
        backIcon={RemoveIcon}
        />
    );
    return(
        <div className="registered-groups scrollbar">
            {groupEntries}
        </div>
    );
}

interface UnregisteredGroupsProps {
    groups: chrome.tabGroups.TabGroup[];
    imgUrls: null | string[];
    isInAddPage: boolean;
    forceUpdate: () => void;
}

export function UnregisteredGroups (props: UnregisteredGroupsProps) {
    let groupEntries = props.groups.map((group, index) => 
        <GroupEntry
        color={group.color}
        title={group.title}
        imgUrl={props.imgUrls ? props.imgUrls[index] : ""}
        key={index}
        last={index == props.groups.length - 1}
        action={async (last) => {
            await registerGroup(group.id);
            await props.forceUpdate();
            return !last;
        }}
        className="unregistered"
        checkOn={() => false}
        backIcon={AddIcon}
        />
    );
    return(
        <div className="unregistered-groups scrollbar" style={{transform: `translateY(${props.isInAddPage ? 0 : 100}%)`}}>
            {groupEntries}
        </div>
    );
}