import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Maintenance Ticketing</h2>
      <div className="nav-links">
        <Link to="/">Tickets</Link>
        <Link to="/tickets/create">Create Ticket</Link>
      </div>
    </nav>
  );
}

export default Navbar;