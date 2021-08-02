import React from "react";

interface RegisterdGroupProps {
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

export const RegisteredGroup = (props: RegisterdGroupProps) => {
    return(
        <div>

        </div>
    );
}