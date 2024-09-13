import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { CartContext } from './CartContext.jsx';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, showCart, toggleCart, removeFromCart, addToCart } =
    useContext(CartContext);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Calculate total items and total cost
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-60 backdrop-blur-md text-white px-4 sm:px-8 py-2 z-10">
      <div className="flex items-center justify-between">
        {/* Logo and Site Title */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="PAOK Hub Logo" className="h-8 mr-1" />
          <span className="text-4xl font-rubik">PAOK Hub</span>
        </Link>

        {/* Desktop Menu and Cart */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="highlightTextOut transition-transform transform active:scale-90"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/statistics"
                className="highlightTextOut transition-transform transform active:scale-90"
              >
                Statistics
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="highlightTextOut transition-transform transform active:scale-90"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/merchandise"
                className="highlightTextOut transition-transform transform active:scale-90"
              >
                Merchandise
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="highlightTextOut transition-transform transform active:scale-90"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Cart Icon */}
          <div className="relative flex items-center lg:ml-6">
            <button
              onClick={toggleCart}
              aria-label="Toggle cart"
              className="relative text-gray-100 flex items-center"
            >
              <FaShoppingCart className="text-3xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {showCart && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white border border-black rounded-lg shadow-lg p-4 z-20"
                style={{ top: '100%', maxHeight: '60vh', overflowY: 'auto' }}
              >
                <h3 className="text-lg font-bold text-center text-black mb-2">
                  Cart Items
                </h3>
                {cart.length === 0 ? (
                  <p className="text-gray-700">Your cart is empty</p>
                ) : (
                  <ul className="space-y-1">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-1"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-black text-white px-1 py-1 rounded text-sm"
                          >
                            -
                          </button>
                          <span className="text-black w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-black text-white px-1 py-1 rounded text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-black w-16 text-right">
                          ${item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {cart.length > 0 && (
                  <>
                    {/* Summary Section */}
                    <div className="mt-2 border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-black">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between text-black">
                        <span>Total Cost:</span>
                        <span>${totalCost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Link to="/checkout">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full rounded">
                          Proceed to Checkout
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-gray-100 flex items-center"
          >
            <FaBars className="text-3xl" />
          </button>

          {/* Cart Icon */}
          <div className="relative flex items-center">
            <button
              onClick={toggleCart}
              aria-label="Toggle cart"
              className="relative text-gray-100 flex items-center"
            >
              <FaShoppingCart className="text-3xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {showCart && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white border border-black rounded-lg shadow-lg p-4 z-20"
                style={{ top: '100%', maxHeight: '60vh', overflowY: 'auto' }}
              >
                <h3 className="text-lg font-bold text-center text-black mb-2">
                  Cart Items
                </h3>
                {cart.length === 0 ? (
                  <p className="text-gray-700">Your cart is empty</p>
                ) : (
                  <ul className="space-y-1">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-1"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-black text-white px-1 py-1 rounded text-sm"
                          >
                            -
                          </button>
                          <span className="text-black w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-black text-white px-1 py-1 rounded text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-black w-16 text-right">
                          ${item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {cart.length > 0 && (
                  <>
                    {/* Summary Section */}
                    <div className="mt-2 border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-black">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between text-black">
                        <span>Total Cost:</span>
                        <span>${totalCost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Link to="/checkout">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full rounded">
                          Proceed to Checkout
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <ul className="flex-col lg:hidden text-xl pt-4 transition-transform transform translate-y-0 duration-300 ease-in-out">
          <li className="py-2">
            <Link
              to="/"
              className="highlightTextOut transition-transform transform active:scale-90"
            >
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/statistics"
              className="highlightTextOut transition-transform transform active:scale-90"
            >
              Statistics
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/gallery"
              className="highlightTextOut transition-transform transform active:scale-90"
            >
              Gallery
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/merchandise"
              className="highlightTextOut transition-transform transform active:scale-90"
            >
              Merchandise
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/contact"
              className="highlightTextOut transition-transform transform active:scale-90"
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;