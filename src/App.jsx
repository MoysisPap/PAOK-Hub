import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/FixturesPage';
import GalleryPage from './pages/GalleryPage';
import MerchandisePage from './pages/MerchandisePage';
import ContactPage from './pages/ContactPage';

function App() {
  return <>
  <Router>
  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/merchandise" element={<MerchandisePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
  </Router>
  </>;
}

export default App;
