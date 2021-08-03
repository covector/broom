import React from "react";
import ReactDOM from "react-dom";
import { GroupEntry } from "./groupEntry";

function Popup() {
    // 240 x 580 total, 240 x 60 each, 9 rows, 40px top bar
    return (
        <div>
        <div style={{height: "40px"}}></div>
        <GroupEntry imgUrl="https://raw.githubusercontent.com/covector/broom/master/dist/img/broom_icon_128.png" color="purple" title="Broom" order={1} selected={false} on={false}/>
        <GroupEntry imgUrl="https://cdn.freelogovectors.net/wp-content/uploads/2018/12/react_logo.png" color="blue" title="React" order={2} selected={false} on={true}/>
        <GroupEntry imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png" color="red" title="Youtube" order={3} selected={false} on={false}/>
        <GroupEntry imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png" color="green" title="Vuejs" order={4} selected={false} on={false}/>
        <GroupEntry imgUrl="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196" color="yellow" title="stack overflow" order={5} selected={false} on={true}/>
        <GroupEntry imgUrl="https://www.w3schools.com/favicon.ico" color="green" title="W3school" order={6} selected={false} on={false}/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);