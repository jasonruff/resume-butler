// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layouts';
import { ProtectedRoute } from './components/auth';

// Public pages
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TestingPage from './pages/TestingPage';

// Protected pages
import DashboardPage from './pages/DashboardPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public routes */}
              <Route index element={<HomePage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="results/:id" element={<ResultsPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="testing" element={<TestingPage />} />
              
              {/* Protected routes */}
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;