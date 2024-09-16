// src/components/Products.jsx
import { useContext } from 'react';
import { CartContext } from './CartContext.jsx';
import product1 from '/assets/product1.png';
import product2 from '/assets/product2.png';
import product3 from '/assets/product3.png';
import product4 from '/assets/product4.png';
import product5 from '/assets/product5.png';
import product6 from '/assets/product6.png';
import product7 from '/assets/product7.png';
import product8 from '/assets/product8.png';
import product9 from '/assets/product9.png';
import product10 from '/assets/product10.png';
import product11 from '/assets/product11.png';
import product12 from '/assets/product12.png';

const products = [
  { id: 1, name: 'Official 1st Home Jersey', price: 75, image: product1 },
  { id: 2, name: 'Official 2nd Home Jersey', price: 75, image: product2 },
  { id: 3, name: 'Official 1st Away Jersey', price: 75, image: product3 },
  { id: 4, name: 'Official 2nd Away Jersey', price: 75, image: product4 },
  { id: 5, name: 'PAOK FC Anthem Jacket', price: 70, image: product5 },
  { id: 6, name: 'PAOK FC Black Hoodie', price: 60, image: product6 },
  { id: 7, name: 'PAOK FC Travel Jacket', price: 120, image: product7 },
  { id: 8, name: 'T-shirt Champions 2024', price: 20, image: product8 },
  { id: 9, name: 'PAOK FC Black Pants', price: 40, image: product9 },
  { id: 10, name: 'PAOK FC Grey Beanie', price: 20, image: product10 },
  { id: 11, name: 'PAOK FC Black Cap 4', price: 30, image: product11 },
  { id: 12, name: 'Memorial Cup', price: 25, image: product12 },
];


const Products = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container mx-auto px-20">
      <h1 className="text-3xl text-neutral-100 font-rubik text-center my-28">
        Official PAOK Hub Merchandise
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-28">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-neutral-100 rounded-xl shadow-md p-4 flex flex-col justify-between items-center"
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
              aria-label={`Add ${product.name} to cart`}
              className="bg-sky-600 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 text-white font-bold py-2 px-4 rounded mt-4"
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
