import { Link } from 'react-router-dom'; // Import Link from React Router
import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Import your logo image

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white px-8 py-2">
      <div className="flex items-center justify-between">
        {/* Logo and Text as Link */}
        <Link to="/" className="flex font-rubik items-center space-x-2">
          <img src={logo} alt="PAOK Hub Logo" className="h-8 mr-2" />
          <span className="text-4xl">PAOK Hub</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/statistics">Fixtures</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/merchandise">Merchandise</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      {isMenuOpen ? (
        <ul className="flex-col lg:hidden text-xl pt-4">
          <li className='py-2'>
            <Link to="/">Home</Link>
          </li>
          <li className='py-2'>
            <Link to="/statistics">Fixtures</Link>
          </li>
          <li className='py-2'>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li className='py-2'>
            <Link to="/merchandise">Merchandise</Link>
          </li>
          <li className='py-2'>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export default NavBar;
