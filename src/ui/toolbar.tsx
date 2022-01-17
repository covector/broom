import React from "react";
import { AddIcon, GearIcon, RemoveIcon, SpinArrowIcon } from "./icons";

interface ToolBarProps {
    toggleAddPage: () => void;
    toggleRemoveMode: () => void;
    recover: () => void;
}

export function ToolBar(props: ToolBarProps) {
    return(
    <div className="toolbar">
        <div className="toolbar-buttons" onClick={() => chrome.runtime.openOptionsPage()}>
            {GearIcon}
        </div>
        <div className="toolbar-buttons" onClick={props.toggleAddPage}>
            {AddIcon}
        </div>
        <div className="toolbar-buttons" onClick={props.toggleRemoveMode}>
            {RemoveIcon}
        </div>
        <div className="toolbar-buttons" onClick={props.recover}>
            {SpinArrowIcon}
        </div>
    </div>
    );
}