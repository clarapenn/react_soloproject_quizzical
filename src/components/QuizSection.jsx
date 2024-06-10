import React from "react"

import Answer from "./Answer"

export default function QuizSection(props) {

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
                        isCorrect={answer.isCorrect}
                        toggleSelected={answer.toggleSelected}
                        showAnswers={props.showAnswers}
                    />
                ))}
            </div>
            <hr></hr>
        </div>
        )
    }