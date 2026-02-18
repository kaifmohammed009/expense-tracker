import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar dark-navbar">
      <h2 className="logo">Expense Tracker</h2>
      <span className="tagline">Track your daily expenses</span>
    </nav>
  );
};

export default Navbar;