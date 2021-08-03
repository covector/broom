import React from "react";

interface SelectCursorProps {
    index: number
}

export const SelectCursor = (props: SelectCursorProps) => {
    console.log(props.index);
    return(
        <div className="selectCursor" style={{transform: `translateY(${(props.index - 1) * 100}%) scale(${props.index ? 1 : 0})`}}>
            <div className="box"></div>
        </div>
    );
}