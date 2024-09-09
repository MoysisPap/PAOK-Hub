
const Footer = () => {
  return (
    <footer className="bg-[#1f0947] text-neutral-200 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top border */}
        <div className="w-full border-t-2 border-neutral-200 mb-4 mx-auto"></div> {/* Increased border width */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center text-lg text-center sm:text-left">
            <span>
              © Copyright{' '}
              <a 
                href="/" 
                className="highlightTextOut transition-transform transform active:scale-90"
                aria-label="Go to homepage"
              >
                PAOK Hub
              </a>{' '}
              2024 | Powered by{' '}
              <a 
                href="https://moysis-papadopoulos.netlify.app/" // Replace with actual link
                target="_blank" 
                className="highlightTextOut transition-transform transform active:scale-90"
                aria-label="Go to Moysis Papadopoulos portfolio"
              >
                Moysis Papadopoulos
              </a>
              {' '}|{' '}
              <a 
                href="/contact" 
                className="highlightTextOut transition-transform transform active:scale-90"
                aria-label="Go to contact page"
              >
                Contact
              </a>
            </span>
            <div className="flex space-x-4 mt-4 sm:mt-0 ml-0 sm:ml-4">
              <a 
                href="https://github.com/MoysisPap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-200 hover:text-amber-500 transition-all duration-300 transform hover:scale-125 active:scale-90"
                aria-label="Visit Moysis GitHub profile"
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/moysis-papadopoulos/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-200 hover:text-amber-500 transition-all duration-300 transform hover:scale-125 active:scale-90"
                aria-label="Visit Moysis LinkedIn profile"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
