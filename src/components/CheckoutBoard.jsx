import { Link } from 'react-router-dom';

const CheckoutBoard = () => {
  return (
    <div className="pt-48 sm:pt-28 min-h-screen px-8 sm:px-24 md:px-28 lg:px-40 xl:px-64">
      {/* Main heading for checkout page */}
      <h2 className="font-rubik text-3xl text-center text-gray-100">
        Welcome to Checkout
      </h2>
      {/* Disclaimer section */}
      <div
        className="text-center text-neutral-100 text-lg md:text-xl my-8 md:my-12"
        aria-live="polite"
      >
        <h3 className="font-extrabold text-2xl md:text-3xl">Disclaimer</h3>
        <p className="my-8 md:my-12">
          Thank you for your interest in purchasing our products. However,
          please note that PAOK Hub is a project created for educational
          purposes only. We do not sell any official PAOK FC merchandise. If you
          wish to purchase official products, please visit the:
        </p>
        <div>
          {/* Link to the official PAOK FC Online Store */}
          <a
            href="https://store.paokfc.gr/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline transition-all duration-300"
            aria-label="Visit the official PAOK FC Online Store"
          >
            PAOK FC Online Store
          </a>
          <span> or go </span>
          {/* Link to navigate back to Merchandise Page */}
          <Link
            to="/merchandise"
            className="text-amber-400 hover:underline transition-all duration-300"
            aria-label="Go back to Merchandise Page"
          >
            back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBoard;
