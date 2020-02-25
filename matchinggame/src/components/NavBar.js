import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppSettings } from "../contexts/AppSettings";

function NavBar() {
  const { navBarVisible, toggleNavBarVisible } = useContext(AppSettings)

  return (
    <>
      <div className="nav-bar" style={{height: navBarVisible ? "10%" : "0%"}}>
        <NavLink className="nav-link" to="/">
          HOME
        </NavLink>
        <NavLink className="nav-link" to="/match">
          MATCH
        </NavLink>
        <NavLink className="nav-link" to="/spell">
          SPELL
        </NavLink>
      </div>
      <button style={{
        position: "fixed",
        right: 0,
        top: 0,
        margin: "20px"
      }} onClick={toggleNavBarVisible}>SHOW/HIDE NAVIGATION</button>
    </>
  );
}

export default NavBar;
