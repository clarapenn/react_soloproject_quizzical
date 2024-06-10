import React from "react"
import Splash from "./components/Splash"
import QuizSection from "./components/QuizSection"
import he from "he"
import {nanoid} from "nanoid"

export default function App() {

  const [quizData, setQuizData] = React.useState(null);
  const [quizInProgress, setQuizInProgress] = React.useState(false)
  const [answersChecked, setAnswersChecked] = React.useState(false)
  const [allCorrect, setAllCorrect] = React.useState(false)
  const [score, setScore] = React.useState(0)

  const fetchData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple');
      const data = await response.json();
      const preparedData = prepareData(data);
      setQuizData(preparedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  function shuffle(array) {
    // https://stackoverflow.com/a/2450976
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  const prepareData = function (data) {
    // Turn the data object (where the data has a results array of the info we need)
    // into an array of objects, each of which has the answers set up the way we want
    // and return that as updatedData

    // loop through data.results and for each result object, make a new object with only
    // what we need, and add to updatedData.

    if (data == null) {
      console.log("Quiz data not ready yet - cannot prepare data");
      return;
    }

    console.log("Trying to prepare raw quiz data")

    let updatedData = data.results.map(
      item => {
        // Start with: making a basic object containing just the question
        const questionId = nanoid();
        const cleanedItem = {
          "question": he.decode(item.question),
          "id": questionId,
        }
        // now add the answers as objects too - what info do they need to track?
        cleanedItem.answers = item.incorrect_answers.map((ans) => {
          const answerId = nanoid();
          return {
            "text": he.decode(ans),
            "id": answerId,
            "isCorrect": false,
            "isSelected": false,
            "toggleSelected": (() => toggleSelected(questionId, answerId))
        }
        })
        // Now add the correct answer, then shuffle
        const correctAnswerId = nanoid();
        const correctAnswer = {
          "text": he.decode(item.correct_answer),
          "id": correctAnswerId,
          "isCorrect": true,
          "isSelected": false,
          "toggleSelected": (() => toggleSelected(questionId, correctAnswerId))
          }
        cleanedItem.answers.push(correctAnswer)
        shuffle(cleanedItem.answers)

        return cleanedItem
      }
    )
    return updatedData
  }

  function setNewQuiz(){
    setQuizInProgress(true)
  }


  function toggleSelected(questionId, answerId){
    console.log("in toggleSelected for id", questionId, answerId);

    setQuizData(oldQuizData => {

      const newQuizData = [];

      for (let i = 0; i < oldQuizData.length; i++) {
        const newQuizItem = oldQuizData[i];
        const oldAnswerArray = newQuizItem.answers;
        const newAnswerArray = []

        for (let j = 0; j < oldAnswerArray.length; j++) {
          let originalAnswer = oldAnswerArray[j];

          if(questionId === newQuizItem.id){
            let updatedAnswer = {
              ...originalAnswer,
              isSelected: originalAnswer.id === answerId ? true : false
            }
            newAnswerArray.push(updatedAnswer)
          } else {
            newAnswerArray.push(originalAnswer)
          }
        }
        newQuizItem.answers = newAnswerArray;
        newQuizData.push(newQuizItem);
      }
      return newQuizData
    })
  }

  function checkAnswers() {

    let selectedAnswerCount = 0
    let correctAnswerChosen = 0

    for (let i = 0; i < quizData.length; i++) {
      const answers = quizData[i].answers;
      for (let j = 0; j < answers.length; j++ ) {
        if (answers[j].isSelected === true)  {
          selectedAnswerCount += 1
        }
        if (answers[j].isCorrect === true && answers[j].isSelected === true){
          correctAnswerChosen += 1
        }
      }
    }

    if (selectedAnswerCount < 5) {
      console.log("You haven't chosen all your answers!")
    } else {
      setAnswersChecked(true);
      setScore(correctAnswerChosen)
      console.log("set answersChecked to true")
      if (selectedAnswerCount === 5 && correctAnswerChosen === 5) {
        setAllCorrect(true);
        console.log("set all correct to true")
      }
    }
  }

  function restartGame (){
    setQuizData(null)
    setAllCorrect(false)
    setAnswersChecked(false)

    fetchData()
  }

  // On first load of the app, fetch the data (and process it to our liking)
  React.useEffect(
    () => {
      fetchData()
    },
    [] // not watching any variables, so only runs when we call it on the prev line
  )

  return (
    <main className="container">

      {/* if(quizInProgress){
        <splash>
      } else {
        if(quizdata === null){
          <p>loading</p>>
        }else{
          all the map stuff here
        }
      } */}

      {!quizInProgress ?
        <Splash setNewQuiz={setNewQuiz} />
        :
        quizData === null ? (
          <p>Loading data...</p>
        ) : (
        ) : ( answersChecked == false ? (
            // render active game
          <div className="game">
            {quizData.map(quizItem => (
              <QuizSection
                key={quizItem.id}
                question={quizItem.question}
                answers={quizItem.answers}
                showAnswers={false}
              />
              ))}
            <button onClick={checkAnswers} className="checkAnswersButton">Check answers</button>
          </div>
        ) : (
            // render completed game
            <div className="game">
            <h2>How did you do?</h2>
            {quizData.map(quizItem => (
              <QuizSection
                key={quizItem.id}
                question={quizItem.question}
                answers={quizItem.answers}
                showAnswers={true}
              />
              ))}

              <h2>You scored {score}/5 correct answers!</h2>

              <button onClick={restartGame} className="restartGameButton">play again</button>


            </div>
        )
          // <pre>{JSON.stringify(quizData, null, 2)}</pre> // For now just show we have the data
        )
      }

    </main>
  )
}
