import React, { useState } from "react";
import { StoredGroupWithoutId } from "../functionality/groups_data";

const color2Hex = {
    "grey": "BDC1C6",
    "blue": "8AB4F8",
    "red": "F28B82",
    "yellow": "FDD663",
    "green": "81C995",
    "pink": "FF8BCB",
    "purple": "D7AEFB",
    "cyan": "78D9EC",
    "orange": "FCAD70"
}

export function GroupDropdown(props: { group: StoredGroupWithoutId }) {
    let [toggled, setToggled] = useState(false);

    return(
        <div className={"group-dropdown" + (toggled ? " toggled" : "")}>
            <div className="group-dropdown-back" onClick={() => { setToggled(!toggled); }} style={{backgroundColor: `#${color2Hex[props.group.color]}`}}>
                <div className="group-dropdown-front">
                    <Triangle />
                    <img className="icon" src={props.group.favIconUrl} />
                    <div className="title">{props.group.title}</div>
                </div>
            </div>
            <div className="group-dropdown-urls">
                {props.group.urls.map((url, index) => <div key={index} className="group-dropdown-url">{url}</div>)}
            </div>
        </div>
    );
}

function Triangle() {
    return(
        <svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="triangle">
            <path d="M9.23472 4.29703C10.503 5.07812 10.503 6.92189 9.23472 7.70297L3.79876 11.0507C2.46624 11.8713 0.75 10.9126 0.75 9.34768L0.750001 2.65231C0.750001 1.08737 2.46624 0.128724 3.79876 0.949344L9.23472 4.29703Z"/>
        </svg>
    );
}