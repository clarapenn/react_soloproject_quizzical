import React from "react"
import Splash from "./components/Splash"
import QuizSection from "./components/QuizSection"
import he from "he"
import {nanoid} from "nanoid"


export default function App() {

  const [quizData, setQuizData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=13&difficulty=easy&type=multiple');
        const data = await response.json();
        const preparedData = prepareData(data);
        setQuizData(preparedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, []); // not watching any variables, so only runs when we call it on the prev line


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
        const cleanedItem = {
          "question": he.decode(item.question),
          "id": nanoid(),
        }

        // now add the answers as objects too - what info do they need to track?
        cleanedItem.answers = item.incorrect_answers.map((ans) => {
          const answerId = nanoid();
          return {
            "text": he.decode(ans),
            "id": answerId,
            "isCorrect": false,
            "isSelected": false,
            "toggleSelected": (() => toggleSelected(answerId))
        }
        })
        // Now add the correct answer, then shuffle
        const correctAnswerId = nanoid();
        const correctAnswer = {
          "text": he.decode(item.correct_answer),
          "id": correctAnswerId,
          "isCorrect": true,
          "isSelected": false,
          "toggleSelected": (() => toggleSelected(correctAnswerId))
          }
        cleanedItem.answers.push(correctAnswer)
        shuffle(cleanedItem.answers)

        return cleanedItem
      }
    )
    return updatedData
  }

  function setNewQuiz(){
    setquizInProgress(true)
  }

  function toggleSelected(answerId){
    console.log("in toggleSelected for id", answerId);
    setQuizData((oldQuizData) => {

      // loop through each item in oldQuizData
      // for each of those items:
      //   loop through all the answers
      //   if the id of the answer matches the given answerId
      //   toggle the isSelected attribute of that answer - ideally in place to avoid rebuilding anything

      let foundAnswer = false;
      for (let i = 0; i < oldQuizData.length; i++) {
        if (foundAnswer) {
          break;
        }
        let answerArray = oldQuizData[i].answers;
        for (let j = 0; j < answerArray.length; j++) {
          let answer = answerArray[j];
          if (answer.id === answerId){
            // flip isSelected to the opposite value
            console.log("Before: ", answer.isSelected)
            answer.isSelected = !answer.isSelected;
            console.log("After: ", answer.isSelected)
            // because we've found it, we don't need to look any more
            foundAnswer = true; // to control the outer loop
            break;
          }
        }
      }
      console.log("oldQuizData after change", oldQuizData)
      console.log(typeof(oldQuizData))
      return oldQuizData
    })
  }

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
          <div>
            {quizData.map(quizItem => (
              <QuizSection
                key={quizItem.id}
                question={quizItem.question}
                answers={quizItem.answers}
              />
              ))}

            <button className="checkAnswersButton">Check answers</button>
          </div>
          // <pre>{JSON.stringify(quizData, null, 2)}</pre> // For now just show we have the data
        )
      }

    </main>
  )
}



// function allNewDice() {
//   const newDice = []
//   for (let i = 0; i < 10; i++) {
//       newDice.push({
//           value: Math.ceil(Math.random() * 6),
//           isHeld: false,
//           id: nanoid()
//       })
//   }
//   return newDice




// const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState(() =>

//       fetch(apiUrl).then(res => res.json()).then(data => data.results)

//   )