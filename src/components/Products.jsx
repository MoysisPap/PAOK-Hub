// src/components/Products.jsx
import { useContext } from 'react';
import { CartContext } from './CartContext.jsx';

const products = [
  { id: 1, name: 'Official 1st Home Jersey', price: 75, image: '/assets/product1.png'},
  { id: 2, name: 'Official 2nd Home Jersey', price: 75, image: '/assets/product2.png' },
  { id: 3, name: 'Official 1st Away Jersey', price: 75, image: '/assets/product3.png' },
  { id: 4, name: 'Official 2nd Away Jersey', price: 75, image: '/assets/product4.png' },
  { id: 5, name: 'PAOK FC Anthem Jacket', price: 70, image: '/assets/product5.png' },
  { id: 6, name: 'PAOK FC Black Hoodie', price: 60, image: '/assets/product6.png'},
  { id: 7, name: 'PAOK FC Travel Jacket', price: 120, image: '/assets/product7.png'},
  { id: 8, name: 'T-shirt Champions 2024', price: 20, image: '/assets/product8.png'},
  { id: 9, name: 'PAOK FC Black Pants', price: 40, image: '/assets/product9.png' },
  { id: 10, name: 'PAOK FC Grey Beanie', price: 20, image: '/assets/product10.png'},
  { id: 11, name: 'PAOK FC Black Cap 4', price: 30, image: '/assets/product11.png' },
  { id: 12, name: 'Memorial Cup', price: 25, image: '/assets/product12.png'},
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
