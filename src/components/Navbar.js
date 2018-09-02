import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark">
        <span className="navbar-brand">
          <img src={logo} alt=""/>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <ul className="navbar-nav">
          <NavLink to="/" className="nav-item">
            <span className="nav-link">
              Strona główna
            </span>
          </NavLink>
          <NavLink to="/orders" className="nav-item">
            <span className="nav-link">
              Zlecenia
            </span>
          </NavLink>
          {/* <NavLink to="/calendar" className="nav-item">
            <span className="nav-link">
              Terminarz
            </span>
          </NavLink> */}
          <NavLink to="/todo" className="nav-item">
            <span className="nav-link">
              Notatki
            </span>
          </NavLink>
          <NavLink to="/workers" className="nav-item">
            <span className="nav-link">
              Pracownicy
            </span>
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
