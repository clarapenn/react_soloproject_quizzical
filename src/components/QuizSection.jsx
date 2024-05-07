import React from "react"

import Answer from "./Answer"


export default function QuizSection(props) {

    const answerButtons = props.answers.map((answer)=> (
        <Answer
            key={answer.id}
            text={answer.text}
            // TODO: pass down the markAsSelected callback thing for onclick
        />
    ))

    return (
        <div key={props.question.id} className="quiz-section">

            <h1>{props.question}</h1>

            <div className="answers">
                {answerButtons}
            </div>
        </div>
    )
}