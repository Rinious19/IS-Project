import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PredictML from './pages/PredictML';
import PredictNN from './pages/PredictNN';
import AboutML from './pages/AboutML';
import AboutNN from './pages/AboutNN';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/predict-ml" replace />} /> {/* Redirect หน้าแรกไปที่ About ML */}
            <Route path="/about-ml" element={<AboutML />} />
            <Route path="/about-nn" element={<AboutNN />} />
            <Route path="/predict-ml" element={<PredictML />} />
            <Route path="/predict-nn" element={<PredictNN />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;