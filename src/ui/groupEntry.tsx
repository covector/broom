import React, { useEffect, useState } from "react";
import { getTabsInGroup } from "../abstraction/tabs";
import { groupIsOn, toggleGroup } from "../functionality/groups_manage";

interface RegisteredEntryProps {
    imgUrl: string;
    color: chrome.tabGroups.ColorEnum;
    title: string;
    id: number;
    action: (id: number) => void;
    manualUpdate: number;
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

export const RegisteredGroupEntry = (props: RegisteredEntryProps) => {
    let [id, setId] = useState(props.id);
    let [on, setOn] = useState(false);
    let [hover, setHover] = useState(false);
    let [actionHover, setActionHover] = useState(false);
    async function checkOn(id) {
        setOn(await groupIsOn(id));
    }
    console.log(props.manualUpdate);
    useEffect(() => { checkOn(props.id); setId(props.id); }, [props.id, props.manualUpdate]);
    let onColor = (isOn) => `#${isOn ? color2Hex[props.color] : "FFFFFF"}`;
    return(
        <div className="groupEntry">
            <div className={"box" + (on ? " on" : "")}
            style={{
                backgroundColor: onColor(on),
                filter: `brightness(${hover ? 0.5 : 1})`
            }}
            onClick={async () => {
                let newId = await toggleGroup(id);
                setId(newId);
                checkOn(newId);
            }}
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            >
                <div className="icon"><img src={props.imgUrl} /></div>
                <div className="colorBar" style={{backgroundColor: onColor(!on)}}></div>
                <div className="title">{props.title}</div>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="action"
                onClick={(e) => {
                    e.stopPropagation();
                    props.action(id);
                }}
                onMouseOver={(e) => {
                    e.stopPropagation();
                    setHover(false);
                    setActionHover(true);
                }}
                onMouseLeave={() => {
                    setHover(true);
                    setActionHover(false);
                }}
                >
                    <path stroke={`#${on ? (actionHover ? "cccccc" : "ffffff") : (actionHover ? color2Hex[props.color] : "8c8c8c")}`} 
                    d="M4 4L32 32M32 4L4 32" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
}

interface UnregisteredEntryProps {
    imgUrl: string;
    color: chrome.tabGroups.ColorEnum;
    title: string;
    id: number;
    action: (id: number) => void;
}

export const UnregisteredGroupEntry = (props: UnregisteredEntryProps) => {
    let [actionHover, setActionHover] = useState(false);
    let color = color2Hex[props.color];
    return(
        <div className="groupEntry">
            <div className="box">
                <div className="icon"><img src={props.imgUrl} /></div>
                <div className="colorBar" style={{backgroundColor: `#${color}`}}></div>
                <div className="title">{props.title}</div>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="action"
                onClick={async (e) => {
                    e.stopPropagation();
                    await props.action(props.id);
                }}
                onMouseOver={(e) => {
                    e.stopPropagation();
                    setActionHover(true);
                }}
                onMouseLeave={() => {
                    setActionHover(false);
                }}
                >
                    <path stroke={`#${actionHover ? color : "8c8c8c"}`} 
                    d="M18 4V32M4 18H32" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
}