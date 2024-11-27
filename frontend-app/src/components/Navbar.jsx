import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">BrandName</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/order" className="text-gray-300 hover:text-white">
            Order
          </Link>
          <Link to="/admin" className="text-gray-300 hover:text-white">
            Admin
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white focus:outline-none" id="navbar-toggle">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="md:hidden" id="navbar-menu">
        <Link to="/" className="block text-gray-300 hover:text-white p-2">
          Home
        </Link>
        <Link to="/order" className="block text-gray-300 hover:text-white p-2">
          Order
        </Link>
        <Link to="/admin" className="block text-gray-300 hover:text-white p-2">
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
