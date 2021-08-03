import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { RegisteredGroups, UnregisteredGroups } from "./pages";

function Popup() {
    let [isAddPage, setIsAddPage] = useState(false);
    let addPage = useRef(null);
    let mainPage = useRef(null);
    const keyDownHandler = (e: KeyboardEvent) => {
        // console.log(e.key);
        // Switch between add page and main page
        if (e.key == "`") {
            isAddPage ? mainPage.current.forceUpdate() : addPage.current.forceUpdate();
            setIsAddPage(!isAddPage);
        }
        // Pass down to corresponding child
        isAddPage ? addPage.current.keyDownHandler(e) : mainPage.current.keyDownHandler(e);
    };
    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    });
    return (
        <div className="popup" onKeyDown={()=>console.log("hi")}>
            <RegisteredGroups ref={mainPage} focus={!isAddPage} />
            <UnregisteredGroups ref={addPage} focus={isAddPage} />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);