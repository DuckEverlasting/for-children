import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import useMountEffect from "./hooks/useMountEffect";
import "./App.css";
import { AppSettings } from "./contexts/AppSettings";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import MatchingGame from "./views/MatchingGame";
import SpellingGame from "./views/SpellingGame";

function App() {
  const { updateDimensions } = useContext(AppSettings);

  useMountEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  });

  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route path="/match">
          <MatchingGame />
        </Route>
        <Route path="/spell">
          <SpellingGame />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <a
        className="credit"
        href="https://www.freepik.com/free-photos-vectors/cartoon"
      >
        Cartoon vector created by freepik - www.freepik.com
      </a>
    </div>
  );
}

export default App;
