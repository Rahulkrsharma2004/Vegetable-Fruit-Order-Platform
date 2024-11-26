// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/order">Place Order</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
