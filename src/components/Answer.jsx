import React from "react"

export default function Answer(props) {

    let answerClassName = "answerButton";
    let disabledAttr = ""; // by default, don't disable things

    if (props.showAnswers === true){
        disabledAttr = "disabled" // this should trigger the browser to set the disabled attr

        // decide on red or green button mode
        if (props.isCorrect) {
            answerClassName = `${answerClassName} answerCorrect`
        }
        else if (props.isSelected && !props.isCorrect){
            answerClassName = `${answerClassName} answerIncorrect`
        }
    }
    else {
        // is the answer a selected answer?
        if (props.isSelected){
            answerClassName = `${answerClassName} answerSelected`;
        }
    }


    return (
        <button
            id={props.id}
            onClick={props.toggleSelected}
            className={answerClassName}
            disabled={disabledAttr}
        >
        {props.text}
        </button>
    )

}