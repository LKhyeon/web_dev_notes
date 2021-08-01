import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <h2>Create a image searching app</h2>
      <p>
        The goal of this challenge is to build an app that can search for images
        using an API. The steps are described below:
      </p>
      <ol>
        <li>
          You will be using this API for this challenge:{" "}
          <a href="https://pixabay.com/api/docs/">Pixabay API</a>
        </li>
        <li>
          There will be an input field at the top where a user can enter a
          search query
        </li>
        <li>
          When they hit enter, the results should show in a nicely formatted
          grid below the input field. The input field should remain fixed at the
          top of the top
        </li>
        <li>
          When the user scrolls, more results will be loaded for the search
          query. Try to implement this using scroll listeners instead of a
          package.
        </li>
      </ol>

      <h3>Bonuses / Extensions</h3>
      <ol>
        <li>
          Can you handle showing results as the user types a search query? Make
          sure not to make too many API calls. What technique should you be
          using?
        </li>
        <li>
          If you click on an image, it opens a large view of the image, and you
          can go back to your search results.
        </li>
      </ol>
    </div>
  );
}
