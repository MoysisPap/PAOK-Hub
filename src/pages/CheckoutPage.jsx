import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

function CheckoutPage() {
  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gradient-to-b from-neutral-950  to-[#1f0947] text-gray-900">
      <h1 className="text-4xl mt-52 font-bold text-center mb-8">Checkout</h1>
      {/* Checkout form or details go here */}
    </div>
    <Footer />
    </>
  )
}

export default CheckoutPage
