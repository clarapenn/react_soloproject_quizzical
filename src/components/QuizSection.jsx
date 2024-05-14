import React from "react"

import Answer from "./Answer"

export default function QuizSection(props) {

    // const answerButtons = props.answers.map((answer)=> (
    //     <button
    //         key={answer.id}
    //         id={answer.id}
    //         onClick={answer.toggleSelected}
    //         className={`answerButton ${answer.isSelected}`}
    //     >
    //     {answer.text}
    //     </button>
    // ))
    console.log(props)

    return (
        <div key={props.question.id} className="quiz-section">

            <h2>{props.question}</h2>

            <div className="answers">
                {/* {answerButtons} */}
                {props.answers.map(answer => (
                    <Answer
                        key={answer.id}
                        id={answer.id}
                        text={answer.text}
                        isSelected={answer.isSelected}
                        toggleSelected={answer.toggleSelected}
                    />
                ))}
            </div>
            <hr></hr>
        </div>
        )
    }