import React from "react";

interface GroupEntryProps {
    imgUrl: string,
    color: chrome.tabGroups.ColorEnum,
    title: string,
    order: number,
    selected: boolean,
    on: boolean
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

const color2HexLight = {
    "grey": "e1e5ea",
    "blue": "e1ecff",
    "red": "f9e1df",
    "yellow": "fff9e6",
    "green": "d1ecd8",
    "pink": "fbdfef",
    "purple": "f9f2ff",
    "cyan": "d8eef3"
}

export const GroupEntry = (props: GroupEntryProps) => {
    let color = `#${color2Hex[props.color]}`;
    let bgColor = `#${props.on ? color2HexLight[props.color] : "FFFFFF"}`
    let state = "";
    state += props.selected ? " selected" : "";
    state += props.on ? " on" : "";
    return(
        <div className="groupEntry">
            <div className={"box" + state} style={{borderColor: color, backgroundColor: bgColor}}>
                <div className="icon"><img src={props.imgUrl} /></div>
                <div className="colorBar" style={{backgroundColor: color}}></div>
                <div className="title">{props.title}</div>
                <div className="order">{props.order}</div>
            </div>
        </div>
    );
}