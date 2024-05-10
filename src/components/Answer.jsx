import React from "react"

export default function Answer(props) {

    return (
        <button
            id={props.id}
            onClick={props.toggleSelected}
            className={`answerButton ${props.isSelected ? ' answerSelected': ''}`}
        >
        {props.text}
        </button>
    )

}