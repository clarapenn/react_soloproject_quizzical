import React from "react"

export default function Splash(props) {
    return (
        <div className="splash">
            <h1>Quizzical</h1>
            <div className="splash--subhead">
                <h2>The ultimate trivia game</h2>
                <button className="startButton" onClick={props.setNewQuiz}>
                    Start game
                </button>
            </div>
        </div>
    )
}


/*
const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
}
*/