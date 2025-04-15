import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { MainLayout } from './components/layouts';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import TestingPage from './pages/TestingPage';
import './App.css';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="testing" element={<TestingPage />} />
          </Route>
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;