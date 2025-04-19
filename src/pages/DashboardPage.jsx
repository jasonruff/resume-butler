// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { databaseService } from '../services/databaseService';
import './DashboardPage.scss';

function DashboardPage() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserAnalyses = async () => {
      try {
        setLoading(true);
        const userAnalyses = await databaseService.getUserResumeAnalyses();
        setAnalyses(userAnalyses);
      } catch (error) {
        setError('Failed to load your resume analyses. Please try again later.');
        console.error('Error fetching analyses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAnalyses();
  }, []);
  
  const handleDeleteAnalysis = async (id) => {
    if (window.confirm('Are you sure you want to delete this analysis? This action cannot be undone.')) {
      try {
        await databaseService.deleteResumeAnalysis(id);
        // Remove the deleted analysis from state
        setAnalyses(analyses.filter(analysis => analysis.id !== id));
      } catch (error) {
        setError('Failed to delete analysis. Please try again.');
        console.error('Error deleting analysis:', error);
      }
    }
  };
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Your Dashboard</h1>
          <p className="dashboard-welcome">
            Welcome back, {user?.email}
          </p>
        </header>
        
        {error && (
          <div className="dashboard-error">
            <p>{error}</p>
          </div>
        )}
        
        <section className="dashboard-actions">
          <Link to="/upload" className="dashboard-action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Resume Analysis
          </Link>
        </section>
        
        <section className="dashboard-content">
          <h2>Your Resume Analyses</h2>
          
          {loading ? (
            <div className="dashboard-loading">
              <div className="dashboard-loading-spinner"></div>
              <p>Loading your analyses...</p>
            </div>
          ) : analyses.length === 0 ? (
            <div className="dashboard-empty">
              <p>You haven't analyzed any resumes yet.</p>
              <Link to="/upload" className="dashboard-upload-link">
                Upload a resume to get started
              </Link>
            </div>
          ) : (
            <div className="analysis-list">
              {analyses.map(analysis => (
                <div key={analysis.id} className="analysis-card">
                  <div className="analysis-card__header">
                    <h3 className="analysis-card__title">{analysis.file_name}</h3>
                    <span className={`analysis-card__score analysis-card__score--${
                      analysis.ats_score >= 80 ? 'high' : 
                      analysis.ats_score >= 60 ? 'medium' : 'low'
                    }`}>
                      {analysis.ats_score}%
                    </span>
                  </div>
                  
                  <div className="analysis-card__meta">
                    <span className="analysis-card__date">
                      Analyzed on {formatDate(analysis.created_at)}
                    </span>
                    <span className="analysis-card__type">
                      {analysis.file_type.split('/')[1].toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="analysis-card__summary">
                    <p>
                      {analysis.feedback.length} improvement suggestions
                    </p>
                    {analysis.keyword_analysis.missingKeywords.length > 0 && (
                      <p>
                        {analysis.keyword_analysis.missingKeywords.length} missing keywords
                      </p>
                    )}
                  </div>
                  
                  <div className="analysis-card__actions">
                    <Link 
                      to={`/results/${analysis.id}`} 
                      className="analysis-card__action analysis-card__action--view"
                    >
                      View Results
                    </Link>
                    <button 
                      className="analysis-card__action analysis-card__action--delete"
                      onClick={() => handleDeleteAnalysis(analysis.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;