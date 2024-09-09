import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/StatisticsPage';
import GalleryPage from './pages/GalleryPage';
import MerchandisePage from './pages/MerchandisePage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/merchandise" element={<MerchandisePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
