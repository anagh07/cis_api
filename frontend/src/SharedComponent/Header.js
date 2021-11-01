import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default function Header() {
  return (
    <Router>
      <nav>
        <ul className="lists">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </Router>
  );
}
