import React, { useState, useEffect } from "react";
import "./App.css";
import { animals } from "./media/animals";

function shuffle(array) {
  let placeholder;
  array.forEach((el, ind) => {
    let swapLoc = Math.floor(Math.random() * array.length);
    placeholder = el;
    array[ind] = array[swapLoc];
    array[swapLoc] = placeholder;
  });
}

function App() {
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  const [images, setImages] = useState(animals);
  const [gameArray, setGameArray] = useState([]);
  const [flippedData, setFlippedData] = useState({});
  const [firstCard, setFirstCard] = useState(null);
  const [hold, setHold] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log("FINAL:", checkIfComplete());
  }, [score])

  function init() {
    const newGameArray = [];
    const newFlippedData = {};
    const pairs = numRows * numCols * 0.5;
    shuffle(images);
    for (let i = 0; i < pairs; i++) {
      newGameArray.push(i, i);
    }
    shuffle(newGameArray);
    setGameArray(newGameArray);
    for (let i = 0; i < newGameArray.length; i++) {
      newFlippedData[i] = false;
    }
    setFlippedData(newFlippedData);
  }

  function setFlip(ind) {
    if (hold) {
      return;
    }
    setFlippedData({
      ...flippedData,
      [ind]: true
    });
    if (firstCard === null) {
      setFirstCard(ind);
    } else {
      setHold(true);
      resolveTurn(ind);
    }
  }

  function resolveTurn(secondCard) {
    if (gameArray[firstCard] !== gameArray[secondCard]) {
      setTimeout(() => {
        setFlippedData({
          ...flippedData,
          [firstCard]: false,
          [secondCard]: false
        });
        setHold(false);
      }, 2000);
    } else {
      setHold(false);
      setScore(score + 2);
    }
    setFirstCard(null);
  }

  function checkIfComplete() {
    return !gameArray.some((el, ind) => {
      console.log(flippedData[ind])
      return !flippedData[ind]
    })
  }

  return (
    <div className="app">
      {gameArray.length && (
        <div
          className="card-box"
          style={{ width: `${10 * numCols}vw`, height: `${10 * numRows}vw` }}
        >
          {gameArray.map((el, ind) => (
            <MatchCard
              image={images[el]}
              flipped={flippedData[ind]}
              setFlip={() => setFlip(ind)}
            />
          ))}
        </div>
      )}
      <a href="https://www.freepik.com/free-photos-vectors/cartoon">
        Cartoon vector created by freepik - www.freepik.com
      </a>
    </div>
  );
}

function MatchCard({ image, flipped, setFlip }) {
  function flip() {
    if (!flipped) {
      setFlip();
    }
  }

  return (
    <div onClick={flip} className={flipped ? "card flipped" : "card"}>
      <div className="card-image-container">
        <img className="card-image" src={image} alt="" />
      </div>
      <div className="card-back" />
    </div>
  );
}

export default App;
