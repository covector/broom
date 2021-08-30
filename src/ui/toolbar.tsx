import React from "react";

interface ToolBarProps {
    toggleAddPage: () => void;
    recover: () => void;
}

export function ToolBar(props: ToolBarProps) {
    return(
    <div className="toolBar">
        <svg width="272" height="272" viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={() => chrome.runtime.openOptionsPage()}>
            <g clipPath="url(#clip0)">
            <path fillRule="evenodd" clipRule="evenodd" d="M89.7697 46.4326L111.438 37.1461L120.725 0H157.871L167.157 37.1461L182.635 46.4326L222.876 24.764L250.736 49.5281L225.972 86.6742L235.258 108.343L275.5 117.629V154.775L235.258 164.062L225.972 182.635L250.736 219.781L222.876 244.545L185.73 225.972L167.157 232.163L157.871 272.404H120.725L111.438 232.163L92.8652 225.972L55.7191 247.64L24.764 219.781L49.5281 182.635L43.3371 164.062L0 154.775V117.629L40.2416 108.343L52.6236 86.6742L24.764 49.5281L52.6236 24.764L89.7697 46.4326ZM139.298 188.826C168.361 188.826 191.922 165.266 191.922 136.202C191.922 107.139 168.361 83.5787 139.298 83.5787C110.235 83.5787 86.6744 107.139 86.6744 136.202C86.6744 165.266 110.235 188.826 139.298 188.826Z" fill="#E3E3E3"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="272" height="272" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={props.toggleAddPage}>
            <path stroke="#E3E3E3" d="M18 4V32M4 18H32" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="272" height="272" viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={props.recover}>
            <g clipPath="url(#clip0)">
            <path d="M161.475 227.362C212.897 222.863 250.935 177.53 246.437 126.108C241.938 74.6858 196.605 36.647 145.183 41.1459C93.7608 45.6447 55.722 90.9776 60.2209 142.4M60.2209 142.4L22.4303 68.3595M60.2209 142.4L131.211 115.498" stroke="#E3E3E3" strokeWidth="43" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="272" height="272" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    </div>
    );
}