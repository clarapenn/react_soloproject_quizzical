import React from "react"

export default function QuizSection(props) {

    const answerButtons = props.answers.map((answer)=> (
        <button key={answer.id} id={answer.id} /*onclick=answer.markAsSelected()*/ className="answer">
            {answer.text}
        </button>
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