// Steps:

// Step 1: Read the code and understand what it is doing. It is essentially
// creating a simulation of https://leetcode.com/problems/game-of-life/.

// Step 2: Write the nextGen function. There are notes in the function
// on what it is supposed to do. It is essentially the logic for the game of life.

// Step 3: Write the function pauseSimulation, randomize, and clearBoard.
// There are some comments for some hints on what that is supposed to do.

import React from "react";
import "./styles.css";
import gliderGunAndPulsars from "./originalPattern.js";

// coded by @no-stack-dub-sack
// modified by Shums into a Challenge

class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: gliderGunAndPulsars,
      generation: 0,
      running: false,
      intervalId: "",
      showPatterns: false
    };
    this.createBoard = this.createBoard.bind(this);
    this.beginSimulation = this.beginSimulation.bind(this);
    this.nextGen = this.nextGen.bind(this);
    this.pauseSimulation = this.pauseSimulation.bind(this);
    this.randomize = this.randomize.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.convertToOneDimension = this.convertToOneDimension.bind(this);
    this.clickChanger = this.clickChanger.bind(this);
  }

  componentDidMount() {
    this.beginSimulation();
  }

  // creates blank or randomized board
  // need blank board first before creating
  // pattern with below function
  createBoard(cells) {
    let config = [];
    for (let i = 0; i < 30; i++) {
      config.push([]);
      for (let j = 0; j < 50; j++) {
        if (cells === "randomize") {
          config[i].push(Math.random() < 0.5 ? 0 : 1);
        } else {
          config[i].push(cells);
        }
      }
    }
    return config;
  }

  // is called at initial rendering (and from restart button),
  // thus calling nextGen() at 500ms intervals until user
  // clears interval with pause or restart buttons
  beginSimulation() {
    if (this.state.running) return;
    this.setState({
      intervalId: setInterval(() => {
        this.nextGen();
      }, 100)
    });
  }

  getNeighbours(i, j, N, M) {
    let count = -this.state.currentBoard[i][j];
    for (let h of [i-1, i, i+1]) {
      if (0 <= h && h < N) {
        for (let v of [j-1, j, j+1]) {
          if (0 <= v && v < M) {
            count += this.state.currentBoard[h][v];
          }
        }
      }
    }
    return count;
  }

  convertBoard(N, M, board) {
    for (let i=0; i < N; i++) {
      for (let j=0; j < M; j++) {
        board[i][j] = board[i][j] % 2;
      }
    }
    return board;
  }

  nextGen() {
    // Advances Game to next state.
    // Updates generation and currentBoard,
    // causing re-rendering. Sets currentBoard state
    // to the next board state, providing
    // an updated game board to be drawn by the re-render.
    if (this.state.running) return;

    const N = this.state.currentBoard.length;
    const M = this.state.currentBoard[0].length;
    const board = new Array(N);
    for (let i=0; i < N; i++) {
      board[i] = new Array(M);
      for (let j=0; j < M; j++) {
        const count = this.getNeighbours(i, j, N, M);
        if (count === 3) {
          board[i][j] = 1;
        } else if (count !== 2) {
          board[i][j] = 0;
        } else {
          board[i][j] = this.state.currentBoard[i][j];
        }
      }
    }
    this.setState({
      ...this.state,
      currentBoard: board,
      generation: this.state.generation + 1,
    });
  }

  pauseSimulation() {
    // Pause the simulation if it is running
    // If it is not running, start the simulation again
    this.setState({
      ...this.state,
      running: !this.state.running
    });
  }

  randomize() {
    // Stop the simulation
    // Randomize the board
    const N = this.state.currentBoard.length;
    const M = this.state.currentBoard[0].length;
    const board = new Array(N);
    for (let i = 0; i < N; i++) {
      board[i] = new Array(M);
      for (let j=0; j < M; j++) {
        board[i][j] = Math.random() < 0.5 ? 0 : 1;
      }
    }
    this.setState({
      ...this.state,
      currentBoard: board,
      running: true,
    })
  }

  clearBoard() {
    // stop the simulation
    // make the board empty again
    const N = this.state.currentBoard.length;
    const M = this.state.currentBoard[0].length;
    const board = new Array(N);
    for (let i = 0; i < N; i++) {
      board[i] = new Array(M);
      for (let j=0; j < M; j++) {
        board[i][j] = 0;
      }
    }
    this.setState({
      ...this.state,
      currentBoard: board,
      running: true,
    })
  }

  convertToOneDimension(multiDimArray) {
    // Converts multi-dim representation of board into a
    // single dimension array than can easily be drawn by the
    // render function.
    let oneDimensional = [];
    multiDimArray.forEach((row) => {
      row.map((cell) => {
        return oneDimensional.push(cell);
      });
    });
    return oneDimensional;
  }

  clickChanger(e) {
    // pass key, get row and column coords
    // update that index to alive or dead
    // according to current state of cell
    let id = e.target.id;
    let el = document.getElementById(id);
    let color = window.getComputedStyle(el).getPropertyValue("background");
    let row = Math.floor(id / 50);
    let col = id % 50;
    let update = this.state.currentBoard;
    if (color.includes("rgb(0, 0, 0)")) {
      update[row][col] = 1;
    } else {
      update[row][col] = 0;
    }
    this.setState({
      currentBoard: update
    });
  }

  render() {
    const dead = { background: "black" };
    const alive = { background: "#66ff33" };
    const board = this.convertToOneDimension(this.state.currentBoard);
    const drawBoard = board.map((cell, i) => {
      let color = cell === 0 ? dead : alive;
      return (
        <div
          id={i}
          onClick={this.clickChanger}
          className="cell"
          style={color}
          key={i}
        ></div>
      );
    });

    return (
      <div>
        <div className="title">Conway's Game of Life</div>
        <GameBoard create={drawBoard} />
        <div className="bottomTab">
          <Counter count={this.state.generation} />
          <Controls
            handleClick={this.pauseSimulation}
            label="Start/Pause/Resume"
            tooltip="Press pause whie a simulation is running, click on some cells, and see what happens when you resume!"
          />
          <Controls handleClick={this.randomize} label="Randomize" />
          <Controls
            handleClick={this.clearBoard}
            label="Clear Board"
            tooltip="Clear the board and click on the cells to make your own patterns!"
          />
        </div>
      </div>
    );
  }
}

// STATELESS COMPONENTS:
class GameBoard extends React.Component {
  render() {
    return (
      <div className="boardWrapper">
        <div className="board">{this.props.create}</div>
      </div>
    );
  }
}

class Controls extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.handleClick}
        title={this.props.tooltip}
        className={this.props.class}
      >
        {this.props.label}
      </div>
    );
  }
}

class Counter extends React.Component {
  render() {
    return (
      <div className="counter">
        Genreation: <div>{this.props.count}</div>
      </div>
    );
  }
}

export default GameOfLife;
