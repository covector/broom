import React, { useEffect, useState } from "react";

const color2Hex = {
    "grey": "BDC1C6",
    "blue": "8AB4F8",
    "red": "F28B82",
    "yellow": "FDD663",
    "green": "81C995",
    "pink": "FF8BCB",
    "purple": "D7AEFB",
    "cyan": "78D9EC"
}

interface GroupEntryProps {
    imgUrl: string;
    color: chrome.tabGroups.ColorEnum;
    title: string;
    action: () => boolean|Promise<boolean>;
    backIcon: () => JSX.Element;
    className: string;
    checkOn: () => boolean|Promise<boolean>;
}

export const GroupEntry = (props: GroupEntryProps) => {
    let [on, setOn] = useState(false);
    useEffect(() => {(async () => {  setOn(await props.checkOn()); })()});
    // block is for preventing more than 1 click before the ui is updated
    let [block, setBlock] = useState(false);
    async function onClick() {
        if (block) {
            if (await props.action()) {
                setBlock(false);
            }
        }
    }
    useEffect(() => { onClick(); }, [block])

    return(
        <div className={"group-entry " + props.className + (on ? " on" : "")}>
            <div className="entry-tab-back" onClick={() => { if (!block) { setBlock(true); } }} style={{backgroundColor: `#${color2Hex[props.color]}`}}>
                <div className="entry-tab-front" style={{borderColor: `#${color2Hex[props.color]}`}}>
                    <div className="icon"><img src={props.imgUrl} /></div>
                    <div className="title">{props.title}</div>
                </div>
            </div>
            <props.backIcon />
        </div>
    );
}