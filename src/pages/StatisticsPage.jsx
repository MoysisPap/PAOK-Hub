import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SuperLeague from '../components/SuperLeague';

function StatisticsPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-[#080526]  to-[#141a56] text-gray-900">
        <div className="container mx-auto pt-28 p-4">
          <SuperLeague/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StatisticsPage;
