import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Products from '../components/Products'

function MerchandisePage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-neutral-950  to-[#1f0947] text-gray-900">
        <div className="container mx-auto pt-28 p-4">
          <Products/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MerchandisePage