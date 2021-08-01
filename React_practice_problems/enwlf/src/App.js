import React from "react";
import Board from "./components/Board";
import "./styles.css";

// Simple Memory Game
// - Below, build a 6 by 6 grid of tile objects
// - For each tile, you can click on them and they will flip over (no animation needed), to reveal a number between 1 and 18
// - When the page loads, initialize each tile to a number, 
// and make sure there is always exactly one pair of numbers per game.
// - Build the game logic for a simple memory game (users can select two tiles at a time, and if the selection is right, the tile stays face up)
// - Bonus: Make the size of the grid easy to change, add flip over animations, and show pairs of icons instead of numbers

export default function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}
