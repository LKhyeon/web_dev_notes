import React, { useEffect, useState } from "react";

export default function Board() {

  const [randomTiles, setRandomTiles] = useState([]);
  const [boardClicked, setBoardClicked] = useState([]);
  const [numClicked, setNumClicked] = useState(0);

  const randNum = (lb, ub) => {
    return Math.floor(Math.random() * (ub - lb + 1) + lb);
  }

  const handleClick = (e) => {
    if (numClicked < 2) {
      setNumClicked(numClicked + 1);
      boardClicked.push(parseInt(e.currentTarget.id));
      setBoardClicked([...boardClicked]);
    }
  }

  useEffect(() => {
    const tileNum = [];
    for (let i = 1; i <= 18; i++) {
      tileNum.push(i);
      tileNum.push(i);
    }
    for (let i = 0; i < 36; i++) {
      const randInd = randNum(i, 35);
      [tileNum[i], tileNum[randInd]] = [tileNum[randInd], tileNum[i]];
    }
    setRandomTiles(tileNum);
  }, []);

  useEffect(() => {
    if (numClicked === 2) {
      const N = boardClicked.length;
      if (randomTiles[boardClicked[N-1]] !== randomTiles[boardClicked[N-2]]) {
        setTimeout(() => {
          boardClicked.pop();
          boardClicked.pop();
          setBoardClicked([...boardClicked]);
        }, 100);
      }
      setNumClicked(0);
    }
  }, [boardClicked, numClicked, randomTiles]);

  const createBoard = () => {
    const newBoard = [];
    if (randomTiles) {
      for (let i = 0; i < 36; i++) {
        newBoard.push(
          <div key={i} id={i} className='tile' onClick={handleClick}>
            <p> {boardClicked.includes(i) ? randomTiles[i] : ''} </p>
          </div>
        );
      }
    }
    return newBoard;
  }

  return (
    <div className='Container'>
      {createBoard()}
    </div>
  );
}
