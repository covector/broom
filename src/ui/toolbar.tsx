import React from "react";

interface ToolBarProps {
    toggleAddPage: () => void;
    recover: () => void;
}

export function ToolBar(props: ToolBarProps) {
    return(
    <div className="toolBar">
        <button onClick={() => chrome.runtime.openOptionsPage()}>Option</button>
        <button onClick={props.toggleAddPage}>toggleAddPage</button>
        <button onClick={props.recover}>recover</button>
    </div>
    );
}