await chrome.storage.sync.set({groups: [
    {
        color: "purple",
        id: 1,
        title: "Broom",
        urls: [
            "https://github.com/covector/broom"
        ],
        favIconUrl: "https://raw.githubusercontent.com/covector/broom/master/dist/img/broom_icon_128.png"
    },
    {
        color: "blue",
        id: 2,
        title: "React",
        urls: [
            "https://reactjs.org/docs/hooks-effect.html",
            "https://reactjs.org/docs/hooks-reference.html"
        ],
        favIconUrl: "https://cdn.freelogovectors.net/wp-content/uploads/2018/12/react_logo.png"
    },
        {
        color: "red",
        id: 3,
        title: "Youtube",
        urls: [
            "https://www.youtube.com/"
        ],
        favIconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
    },
        {
        color: "green",
        id: 4,
        title: "Vuejs",
        urls: [
            "https://vuejs.org/"
        ],
        favIconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png"
    },
        {
        color: "yellow",
        id: 5,
        title: "stack overflow",
        urls: [
            "https://stackoverflow.com/questions/21578208/node-js-send-file-to-client",
            "https://stackoverflow.com/"
        ],
        favIconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
    },
        {
        color: "green",
        id: 6,
        title: "W3school",
        urls: [
            "https://www.w3schools.com/"
        ],
        favIconUrl: "https://www.w3schools.com/favicon.ico"
    },
]});