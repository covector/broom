import React, { useImperativeHandle, forwardRef, useState, useEffect } from "react";
import { toggleGroup } from "../functionality/groups_manage";
import { readRegistered } from "../functionality/groups_store";
import { GroupEntry } from "./groupEntry";
import { SelectCursor } from "./selectCursor";

interface RegisteredGroupsProps {
    focus: boolean;
}

export const RegisteredGroups = forwardRef((props: RegisteredGroupsProps, ref) => {
    let [groups, setGroups] = useState([])
    let [cursorPoint, setCursorPoint] = useState(0);
    let [page, setPage] = useState(1);
    const updateGroups = async () => {
        setGroups(await readRegistered());
    }
    useEffect(() => { updateGroups(); }, []);
    useImperativeHandle(ref, () => ({
        keyDownHandler(e: KeyboardEvent) {
            let tryParse = parseInt(e.key);
            if (tryParse != NaN && tryParse >= 0 && tryParse <= 9) {
                let newValue = tryParse ? tryParse : 10;
                if (newValue == cursorPoint) {
                    setCursorPoint(0);
                    // Confirmed
                    let id = groups[(page - 1) * 10 + newValue];
                    console.log(id);
                    // toggleGroup(id);
                }
                else {
                    setCursorPoint(newValue);
                }
            }
        },
        forceUpdate() {
            updateGroups();
        }
    }));
    return(
        <div className="registeredGroups">
            <SelectCursor index={cursorPoint} />
                <div>
                <GroupEntry imgUrl="https://raw.githubusercontent.com/covector/broom/master/dist/img/broom_icon_128.png" color="purple" title="Broom" order={1} on={false} registered={true}/>
                <GroupEntry imgUrl="https://cdn.freelogovectors.net/wp-content/uploads/2018/12/react_logo.png" color="blue" title="React" order={2} on={true} registered={true}/>
                <GroupEntry imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png" color="red" title="Youtube" order={3} on={false} registered={true}/>
                <GroupEntry imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png" color="green" title="Vuejs" order={4} on={false} registered={true}/>
                <GroupEntry imgUrl="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196" color="yellow" title="stack overflow" order={5} on={true} registered={true}/>
                <GroupEntry imgUrl="https://www.w3schools.com/favicon.ico" color="green" title="W3school" order={6} on={false} registered={true}/>
            </div>
            <div style={{width: "12px"}}></div>
        </div>
    );
});

interface UnregisteredGroupsProps {
    focus: boolean
}

export const UnregisteredGroups = forwardRef((props: UnregisteredGroupsProps, ref) => {
    useImperativeHandle(ref, () => ({
        keyDownHandler(e: KeyboardEvent) {
            console.log("add");
        },
        forceUpdate() {
        
        }
    }));

    return(
        <div className="unregisteredGroups">
            <SelectCursor index={0} />
                <div>
                <GroupEntry imgUrl="https://raw.githubusercontent.com/covector/broom/master/dist/img/broom_icon_128.png" color="purple" title="Broom" order={1} on={false} registered={false}/>

            </div>
            <div style={{width: "12px"}}></div>
        </div>
    );
});