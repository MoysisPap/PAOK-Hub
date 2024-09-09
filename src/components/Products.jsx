import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import the Link component if you're using React Router

const products = [
  {
    id: 1,
    name: 'Official 1st Home Jersey',
    price: 75,
    image: '/src/assets/product1.png',
  },
  {
    id: 2,
    name: 'Official 2nd Home Jersey',
    price: 75,
    image: '/src/assets/product2.png',
  },
  {
    id: 3,
    name: 'Official 1st Away Jersey',
    price: 75,
    image: '/src/assets/product3.png',
  },
  {
    id: 4,
    name: 'Official 2nd Away Jersey',
    price: 75,
    image: '/src/assets/product4.png',
  },
  {
    id: 5,
    name: 'PAOK FC Anthem Jacket',
    price: 70,
    image: '/src/assets/product5.png',
  },
  {
    id: 6,
    name: 'PAOK FC Black Hoodie',
    price: 60,
    image: '/src/assets/product6.png',
  },
  {
    id: 7,
    name: 'PAOK FC Travel Jacket',
    price: 120,
    image: '/src/assets/product7.png',
  },
  {
    id: 8,
    name: 'T-shirt Champions 2024',
    price: 20,
    image: '/src/assets/product8.png',
  },
  {
    id: 9,
    name: 'PAOK FC Black Pants',
    price: 40,
    image: '/src/assets/product9.png',
  },
  {
    id: 10,
    name: 'PAOK FC Grey Beanie',
    price: 20,
    image: '/src/assets/product10.png',
  },
  {
    id: 11,
    name: 'PAOK FC Black Cap 4',
    price: 30,
    image: '/src/assets/product11.png',
  },
  {
    id: 12,
    name: 'Memorial Cup',
    price: 25,
    image: '/src/assets/product12.png',
  },
];

const Products = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== productId));
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="container mx-auto p-20">
      {/* Header with Cart Icon */}
      <div className="relative mb-8 text-white p-4">
        <h1 className="text-4xl font-rubik text-center">
          PAOK Hub Merchandise
        </h1>
        <div className="absolute top-4 right-4">
          <button onClick={toggleCart} className="relative text-gray-100">
            <FaShoppingCart className="text-3xl" />
            {/* Cart item count */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {showCart && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-black rounded-lg shadow-lg p-4">
              {cart.length === 0 ? (
                <p className="text-gray-700">Your cart is empty</p>
              ) : (
                <ul>
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-black flex-1">{item.name}</span>
                      <div className="flex items-center space-x-2 flex-1 justify-center">
                        {/* Minus Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-black text-white px-2 py-1 rounded"
                        >
                          -
                        </button>
                        {/* Quantity */}
                        <span className="text-black">{item.quantity}</span>
                        {/* Plus Button */}
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-black text-white px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                      {/* Total Price */}
                      <span className="text-black flex-1 text-right">
                        ${item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Proceed to Checkout Button */}
              {cart.length > 0 && (
                <div className="mt-4">
                  <Link to="/checkout">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full rounded">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between items-center"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-36 h-44 object-cover mb-2"
            />

            {/* Product Name */}
            <h2 className="text-lg text-center font-bold text-gray-800">
              {product.name}
            </h2>

            {/* Product Price */}
            <p className="text-gray-700">${product.price}</p>

            {/* Spacer to push the button down */}
            <div className="flex-grow"></div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="bg-violet-600 shadow-sm transition-all duration-200 ease-in-out shadow-black hover:bg-violet-900 hover:scale-105 active:scale-95 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
