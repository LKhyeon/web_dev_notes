import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <h2>Create a simple quiz app</h2>
      <p>
        The goal of this challenge is to build a true or false quiz. Feel free
        to remove these instructions by saving it to another file. The steps are
        below:
      </p>
      <ol>
        <li>
          Fetch data using this{" "}
          <a href="https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean">
            API
          </a>
        </li>
        <li>
          Show the questions on all on screen and allow the user to input their
          answers
        </li>
        <li>
          Add a submit button at the bottom, and when the user submits, it takes
          them to another page where they can see their results. This will show
          their total score, as well as how they did on each question
        </li>
      </ol>

      <h3>Bonuses / Extensions</h3>
      <ol>
        <li>
          Show only one question per screen, and have a forward and back button
          to cycle between questions
        </li>
      </ol>
    </div>
  );
}
