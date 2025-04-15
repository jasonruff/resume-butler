import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { mockResumeFile, mockParsedResume, mockAnalysisResults } from '../utils/testing/mockResumeData';
import './TestingPage.scss';

function TestingPage() {
  const { state, actions, dispatch } = useResume();
  const [loadedState, setLoadedState] = useState(null);
  
  // Reset state to initial
  const resetState = () => {
    // Clear the file state
    actions.clearFile();
    
    // Clear the parsed resume state
    dispatch({ type: 'CLEAR_PARSED_RESUME' });
    
    // Clear the analysis state
    dispatch({ type: 'CLEAR_ANALYSIS' });
    
    // Reset UI state to upload
    actions.setCurrentStep('upload');
    
    setLoadedState(null);
  };
  
  // Simulate file upload
  const loadFileData = () => {
    // Set file data
    actions.setFile(mockResumeFile.data);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      actions.updateUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setLoadedState('file');
      }
    }, 200);
  };
  
  // Simulate parsing
  const loadParsedData = () => {
    // Set current step
    actions.setCurrentStep('parsing');
    
    // Simulate delay
    setTimeout(() => {
      // Set parsed resume data
      actions.setParsedResume(mockParsedResume);
      setLoadedState('parsed');
    }, 1000);
  };
  
  // Simulate analysis
  const loadAnalysisData = () => {
    // Set current step
    actions.setCurrentStep('analysis');
    
    // Start analysis
    actions.startAnalysis();
    
    // Simulate delay
    setTimeout(() => {
      // Set analysis results
      actions.setAnalysisResults(mockAnalysisResults);
      
      // Set current step
      actions.setCurrentStep('results');
      
      setLoadedState('analyzed');
    }, 1500);
  };
  
  // Simulate the entire flow
  const simulateFullFlow = () => {
    resetState();
    
    // Load file
    loadFileData();
    
    // After file is loaded, parse it
    setTimeout(() => {
      loadParsedData();
      
      // After parsing is complete, analyze it
      setTimeout(() => {
        loadAnalysisData();
      }, 1500);
    }, 1500);
  };
  
  return (
    <div className="testing-page">
      <div className="testing-page__container">
        <h1>Test Resume Flow</h1>
        <p>
          This page allows you to test the resume upload, parsing, and analysis flow
          using mock data.
        </p>
        
        <div className="testing-page__status">
          <h2>Current State</h2>
          <div className="testing-page__status-item">
            <span className="testing-page__status-label">File:</span>
            <span className={`testing-page__status-indicator ${state.file.data ? 'testing-page__status-indicator--active' : ''}`}>
              {state.file.data ? 'Loaded' : 'Not Loaded'}
            </span>
          </div>
          <div className="testing-page__status-item">
            <span className="testing-page__status-label">Parsed Resume:</span>
            <span className={`testing-page__status-indicator ${state.parsedResume.rawText ? 'testing-page__status-indicator--active' : ''}`}>
              {state.parsedResume.rawText ? 'Loaded' : 'Not Loaded'}
            </span>
          </div>
          <div className="testing-page__status-item">
            <span className="testing-page__status-label">Analysis:</span>
            <span className={`testing-page__status-indicator ${state.analysis.status === 'success' ? 'testing-page__status-indicator--active' : ''}`}>
              {state.analysis.status === 'idle' ? 'Not Started' : 
               state.analysis.status === 'loading' ? 'Loading' : 
               state.analysis.status === 'success' ? 'Complete' : 'Error'}
            </span>
          </div>
          <div className="testing-page__status-item">
            <span className="testing-page__status-label">Current Step:</span>
            <span className="testing-page__status-indicator">
              {state.ui.currentStep}
            </span>
          </div>
        </div>
        
        <div className="testing-page__actions">
          <h2>Test Actions</h2>
          <div className="testing-page__buttons">
            <button
              className="testing-page__button"
              onClick={resetState}
            >
              Reset State
            </button>
            <button
              className="testing-page__button"
              onClick={loadFileData}
              disabled={loadedState === 'file' || loadedState === 'parsed' || loadedState === 'analyzed'}
            >
              Load File Data
            </button>
            <button
              className="testing-page__button"
              onClick={loadParsedData}
              disabled={!state.file.data || loadedState === 'parsed' || loadedState === 'analyzed'}
            >
              Load Parsed Data
            </button>
            <button
              className="testing-page__button"
              onClick={loadAnalysisData}
              disabled={!state.parsedResume.rawText || loadedState === 'analyzed'}
            >
              Load Analysis Data
            </button>
            <button
              className="testing-page__button testing-page__button--primary"
              onClick={simulateFullFlow}
            >
              Simulate Full Flow
            </button>
          </div>
        </div>
        
        <div className="testing-page__navigation">
          <h2>Navigation</h2>
          <div className="testing-page__nav-buttons">
            <Link to="/upload" className="testing-page__nav-button">
              Upload Page
            </Link>
            <Link to="/analysis" className="testing-page__nav-button">
              Analysis Page
            </Link>
            <Link to="/results" className="testing-page__nav-button">
              Results Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestingPage;