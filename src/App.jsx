import React from "react"
import Splash from "./components/Splash"
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

    let updatedData = data.results.map(
      item => {
        // Start with: making a basic object containing just the question
        const polishedItem = {
          "question": he.decode(item.question),
          "id": nanoid(),
        }
        // now add the answers as objects too - what info do they need to track?

        polishedItem.answers = item.incorrect_answers.map((ans) => {
          return {
            "text": he.decode(ans),
            "id": nanoid(),
            "isCorrect": false,
          }
        })

        // Now add the correct answer, then shuffle
        const correctAnswer = {
          "text": he.decode(item.correct_answer),
          "id": nanoid(),
          "isCorrect": true,
        }
        polishedItem.answers.push(correctAnswer)
        shuffle(polishedItem.answers)

        return polishedItem
      }
    )

    return updatedData
  }

  return (
    <main className="container">
      {/* <Splash />*/}

      {/* TODO: move the below into a Quiz component, with the data passed in a prop */}
      {quizData === null ? (
        <p>Loading data...</p>
      ) : (
        <pre>{JSON.stringify(quizData, null, 2)}</pre> // For now just show we have the data
      )}

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