import React from "react"
import Splash from "./components/Splash"
import he from "he"


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

  const prepareData = function (data) {
    // Turn the data object (where the data has a results array of the info we need)
    // into an array of objects, each of which has the answers set up the way we want
    // and return that as updatedData

    // loop through data.results and for each result object, make a new object with only
    // what we need, and add to updatedData.

    let updatedData = data.results.map(
      item => {
        const polishedItem = {
          "question": he.decode(item.question)
        }
        return polishedItem
      }
    )


    // Start with: making a basic object containing just the question
    // Then add the answers as objects too - what info do they need to track?
    // Then shuffle them
    // Remember react needs unique ids on all of these, so let's add them too



    // push the new object onto the array


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