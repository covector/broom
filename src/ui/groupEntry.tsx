import React from "react";

interface GroupEntryProps {
    imgUrl: string,
    color: chrome.tabGroups.ColorEnum,
    title: string,
    order: number,
    on: boolean,
    registered: boolean
}

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

export const GroupEntry = (props: GroupEntryProps) => {
    let onColor = (on) => `#${on ? color2Hex[props.color] : "FFFFFF"}`;
    return(
        <div className="groupEntry">
            <div className={"box" + (props.on ? " on" : "")} style={{backgroundColor: onColor(props.on)}}>
                <div className="add" style={{display: props.registered ? "none" : "block"}}>+</div>
                <div className="icon"><img src={props.imgUrl} /></div>
                <div className="colorBar" style={{backgroundColor: onColor(!props.on)}}></div>
                <div className="title">{props.title}</div>
                <div className="order">{props.order}</div>
            </div>
        </div>
    );
}