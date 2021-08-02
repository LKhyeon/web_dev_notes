import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Quiz() {

  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch all of the question data first:
    const url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean";
    fetch(url)
    .then((res) => {
      if (res) {
        return res.json();
      } else {
        throw new Error("Could not connect to the quiz API");
      }
    })
    .then((data) => {
      if (data && data.results) {
        const newQuestion = data.results.map(q => {
          return { question: q.question, answer: q.correct_answer, selection: null};
        });
        setQuestions(newQuestion);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const createQuestion = useCallback(() => {
    // Creating a nested function:
    const setSelection = (e) => {
      const selectionData = e.currentTarget.id.split('-');
      const selection = selectionData[0];
      const ind = selectionData[1];
      questions[ind].selection = selection;
      setQuestions([...questions]);
    }

    const questionList = [];
    for (let i = 0; i < questions.length; i++) {
      questionList.push(
        <div key={i}>
          <p> {questions[i].question} </p>
          <button id={`True-${i}`} onClick={setSelection}> TRUE </button>
          <button id={`False-${i}`} onClick={setSelection}> FALSE </button>
          <p> CURRENTLY SELECTED: {questions[i].selection} </p>
        </div>
      );
    }
    return questionList;
  }, [questions]);

  const finalizeQuiz = () => {
    let sumCorrect = 0;
    for (let question of questions) {
      sumCorrect += (question.answer === question.selection) ? 1 : 0;
    }
    history.push("/final", { score: sumCorrect });
  }

  return (
    <div>
      {createQuestion()}
      <button onClick={finalizeQuiz}> SUBMIT </button>
    </div>
  )
}
