import React, { useState, useEffect } from "react";
import { Route } from 'react-router-dom'; 
import "./App.css";
import { animals } from "./media/animals";
import MatchingGame from "./MatchingGame";

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    smallest: window.innerWidth > window.innerHeight ? "vh" : "vw"
  })
  // eslint-disable-next-line
  const [images, setImages] = useState(animals);


  useEffect(() => {
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
  
  return (
    <div className="app">
      <MatchingGame dimensions={dimensions} images={images} />
      <a className="credit" href="https://www.freepik.com/free-photos-vectors/cartoon">
        Cartoon vector created by freepik - www.freepik.com
      </a>
    </div>
  );
}

export default App;
