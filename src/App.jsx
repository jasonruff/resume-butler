import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import './styles/global.scss';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;