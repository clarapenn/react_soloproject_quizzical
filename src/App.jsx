import React from "react"
import Splash from "./components/Splash"


export default function App() {

  const [quizData, setQuizData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // not watching any variables, so only runs when we call it on the prev line

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








// const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState(() =>

//       fetch(apiUrl).then(res => res.json()).then(data => data.results)

//   )