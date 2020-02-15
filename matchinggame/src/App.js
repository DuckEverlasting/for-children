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
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    smallest: window.innerWidth > window.innerHeight ? "vh" : "vw"
  })
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  // eslint-disable-next-line
  const [images, setImages] = useState(animals);
  const [gameArray, setGameArray] = useState([]);
  const [flippedData, setFlippedData] = useState({});
  const [firstCard, setFirstCard] = useState(null);
  const [hold, setHold] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    init();
    window.addEventListener("resize", updateOnResize)
    function updateOnResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        smallest: window.innerWidth > window.innerHeight ? "vh" : "vw"
      })
    }
    return () => window.removeEventListener("resize", updateOnResize)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("FINAL:", checkIfComplete());
    // eslint-disable-next-line
  }, [score])

  function init(rows=numRows, cols=numCols) {
    const newGameArray = [];
    const newFlippedData = {};
    const pairs = Math.floor(rows * cols * 0.5);
    shuffle(images);
    for (let i = 0; i < pairs; i++) {
      newGameArray.push(i, i);
    }
    shuffle(newGameArray);
    if (rows * cols % 2) {
      newGameArray.splice(pairs, 0, null)
    }
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
      return el !== null && !flippedData[ind]
    })
  }

  function handleChange(ev) {
    let value = Math.floor(ev.target.value);
    if (value < 3) {
      value = 3;
    } else if (value > 5) {
      value = 5;
    }
    if (ev.target.name === "rows") {
      init(value, numCols);
      setNumRows(value);
    } else if (ev.target.name === "columns") {
      init(numRows, value);
      setNumCols(value);
    }
  }

  function getDimensions(type) {
    const max = 80;
    const unit = numRows > numCols ? max / numRows : max / numCols; 

    if (type === "card-box") {
      return { width: `${unit * numCols}${dimensions.smallest}`, height: `${unit * numRows}${dimensions.smallest}` }
    } else if (type === "card") {
      return { width: `${unit}${dimensions.smallest}`, height: `${unit}${dimensions.smallest}` }
    }
    
  }

  return (
    <div className="app">
      {gameArray.length && (
        <div
          className="card-box"
          style={getDimensions("card-box")}
        >
          {gameArray.map((el, ind) => (
            el === null ?
            <div style={getDimensions("card")} />
            :
            <MatchCard
              image={images[el]}
              flipped={flippedData[ind]}
              setFlip={() => setFlip(ind)}
              style={getDimensions("card")}
            />
          ))}
        </div>
      )}
      <Settings handleChange={handleChange} numRows={numRows} numCols={numCols}/>
      <a className="credit" href="https://www.freepik.com/free-photos-vectors/cartoon">
        Cartoon vector created by freepik - www.freepik.com
      </a>
    </div>
  );
}

function Settings(props) {
  return (
    <div className="input-box">
      <label>
        Rows:
        <input name="rows" type="number" min={3} max={5} onChange={props.handleChange} value={props.numRows} />
      </label>
      <label>
        Columns:
        <input name="columns" type="number" min={3} max={5} onChange={props.handleChange} value={props.numCols} />
      </label>
    </div>
  )
}

function MatchCard({ image, flipped, setFlip, style }) {
  function flip() {
    if (!flipped) {
      setFlip();
    }
  }

  return (
    <div style={style} onClick={flip} className={flipped ? "card flipped" : "card"}>
      <div className="card-image-container">
        <img className="card-image" src={image} alt="" />
      </div>
      <div className="card-back" />
    </div>
  );
}

export default App;
