import React from "react"


// TODO: think about how we'll hook up the clickhandler to trigger markAsSelected like isHeld

export default function Answer(props) {
    return (
        <button /*onclick=markAsSelected()*/ className="answer">{props.text}</button>
    )
}