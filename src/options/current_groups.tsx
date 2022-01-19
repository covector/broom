import React from "react";
import { StoredGroupWithoutId } from "../functionality/groups_data";
import { ExportGroups } from "./export_groups";
import { GroupDropdown } from "./group_dropdown";

export function CurrentGroups(props: { data: StoredGroupWithoutId[] }) {
    return (
        <div className="current-groups">
            <h1 className="current-groups-title">Current Stored Groups</h1>
            <ExportGroups />
            <div className="current-groups-list">
                {props.data.map((group, index) => <GroupDropdown key={index} group={group} />)}
            </div>
        </div>
    );
}