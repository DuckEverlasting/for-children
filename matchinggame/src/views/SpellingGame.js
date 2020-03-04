import React, { useState, useEffect, useContext } from 'react';
import { AppSettings } from "../contexts/AppSettings";

function SpellingGame() {
  const { dimensions, images, navBarVisible } = useContext(AppSettings) 
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    let array = "DOG".split('').map(letter => {
      return {char: letter, revealed: true}
    })
    setCurrent(array)
  }, [])

  return (
    <div className="spelling-game">
      <img src={images[5].image} alt=""/>
      <div className="word-box">
        {current.map(el => {
          return <div className="letter-box">
            <span className="letter">{el.revealed ? el.char : "_"}</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default SpellingGame;