import React from "react";
import { AddIcon, GearIcon, RemoveIcon, SpinArrowIcon } from "./icons";

interface ToolBarProps {
    toggleAddPage: () => void;
    toggleRemoveMode: () => void;
    recover: () => void;
    adding: boolean;
    removing: boolean;
}

export function ToolBar(props: ToolBarProps) {
    return(
    <div className="toolbar">
        <div title="Options" className="toolbar-buttons options-button" onClick={() => chrome.runtime.openOptionsPage()}>
            <GearIcon />
        </div>
        <div title="Register a group" className={"toolbar-buttons add-button" + (props.adding ? " adding" : "")} onClick={props.toggleAddPage}>
            <AddIcon />
        </div>
        <div title="Unregister a group" className={"toolbar-buttons remove-button" + (props.removing ? " removing" : "")} onClick={props.toggleRemoveMode}>
            <RemoveIcon />
        </div>
        <div title="Undo changes" className="toolbar-buttons undo-button" onClick={props.recover}>
            <SpinArrowIcon />
        </div>
    </div>
    );
}