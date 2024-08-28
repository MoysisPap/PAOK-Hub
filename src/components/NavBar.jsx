import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import your logo image

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md text-white px-4 sm:px-8 py-2 z-10">
      <div className="flex items-center justify-between">
        {/* Logo and Text as Link */}
        <Link to="/" className="flex font-rubik items-center space-x-2">
          <img src={logo} alt="PAOK Hub Logo" className="h-8 mr-2" />
          <span className="text-4xl">PAOK Hub</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <div
            id="nav-icon2"
            className={isMenuOpen ? 'open' : ''}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link to="/" className="highlightTextOut" alt="Home">Home</Link>
          </li>
          <li>
            <Link to="/statistics" className="highlightTextOut" alt="Fixtures">Fixtures</Link>
          </li>
          <li>
            <Link to="/gallery" className="highlightTextOut" alt="Gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/merchandise" className="highlightTextOut" alt="Merchandise">Merchandise</Link>
          </li>
          <li>
            <Link to="/contact" className="highlightTextOut" alt="Contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <ul className="flex-col lg:hidden text-xl pt-4 transition-transform transform translate-y-0 duration-300 ease-in-out">
          <li className="py-2">
            <Link to="/" className="highlightTextOut" alt="Home">Home</Link>
          </li>
          <li className="py-2">
            <Link to="/statistics" className="highlightTextOut" alt="Fixtures">Fixtures</Link>
          </li>
          <li className="py-2">
            <Link to="/gallery" className="highlightTextOut" alt="Gallery">Gallery</Link>
          </li>
          <li className="py-2">
            <Link to="/merchandise" className="highlightTextOut" alt="Merchandise">Merchandise</Link>
          </li>
          <li className="py-2">
            <Link to="/contact" className="highlightTextOut" alt="Contact">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
