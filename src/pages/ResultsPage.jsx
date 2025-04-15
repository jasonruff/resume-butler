import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  ScoreCard, 
  FeedbackList, 
  OptimizedContent, 
  KeywordAnalysis 
} from '../components/resume-results';
import './ResultsPage.scss';

function ResultsPage() {
  const { state, actions } = useResume();
  const navigate = useNavigate();
  
  const { parsedResume, analysis, ui } = state;
  
  // Redirect to upload if no resume data is available
  useEffect(() => {
    if (!parsedResume.rawText) {
      navigate('/upload');
    } else if (ui.currentStep === 'upload') {
      // If we have data but the step is still 'upload', update it
      actions.setCurrentStep('results');
    }
  }, [parsedResume, ui.currentStep, navigate, actions]);
  
  // Load mock analysis data if none exists
  useEffect(() => {
    if (parsedResume.rawText && analysis.status === 'idle') {
      actions.startAnalysis();
      
      // Mock API call - in a real app, this would be a actual API call
      import('../services/llamaApi')
        .then(api => {
          return api.analyzeResume(parsedResume);
        })
        .then(results => {
          actions.setAnalysisResults(results);
        })
        .catch(error => {
          actions.dispatch({ 
            type: 'ANALYSIS_FAILURE', 
            payload: error.message 
          });
        });
    }
  }, [parsedResume, analysis.status, actions]);
  
  if (analysis.status === 'loading') {
    return (
      <div className="results-page">
        <div className="results-page__loading">
          <h2>Analyzing Your Resume</h2>
          <div className="results-page__loading-spinner"></div>
          <p>Our AI is evaluating your resume for ATS compatibility...</p>
        </div>
      </div>
    );
  }
  
  if (analysis.status === 'error') {
    return (
      <div className="results-page">
        <div className="results-page__error">
          <h2>Analysis Error</h2>
          <p>{analysis.error || 'An error occurred during analysis'}</p>
          <button 
            className="results-page__retry-btn"
            onClick={() => actions.startAnalysis()}
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }
  
  if (analysis.status !== 'success') {
    return null;
  }
  
  return (
    <div className="results-page">
      <div className="results-page__header">
        <h1>Your Resume Analysis</h1>
        <p>
          We've analyzed your resume for ATS compatibility and identified 
          areas for improvement.
        </p>
      </div>
      
      <div className="results-page__content">
        <div className="results-page__main">
          <ScoreCard score={analysis.results.atsScore} />
          
          <section className="results-page__section">
            <h2>Feedback & Recommendations</h2>
            <FeedbackList feedback={analysis.results.feedback} />
          </section>
          
          <section className="results-page__section">
            <h2>Keyword Analysis</h2>
            <KeywordAnalysis keywordAnalysis={analysis.results.keywordAnalysis} />
          </section>
        </div>
        
        <div className="results-page__sidebar">
          <section className="results-page__section">
            <h2>Optimized Content</h2>
            <OptimizedContent
              optimizedContent={analysis.results.optimizedContent} 
              originalSections={parsedResume.sections}
            />
          </section>
        </div>
      </div>
      
      <div className="results-page__actions">
        <button 
          className="results-page__action-btn results-page__action-btn--secondary"
          onClick={() => navigate('/upload')}
        >
          Upload New Resume
        </button>
        <button className="results-page__action-btn results-page__action-btn--primary">
          Download Results
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;