import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useResume } from '../../context/ResumeContext';
import { parseResume } from '../../services/parserService';
import './ResumeParser.scss';

function ResumeParser({ onParsingComplete }) {
  const { state, actions } = useResume();
  const { file } = state;
  const [parsingStatus, setParsingStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!file.data) return;

    const parseFile = async () => {
      try {
        setParsingStatus('parsing');
        
        // Simulate parsing progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + 5;
            if (newProgress >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return newProgress;
          });
        }, 200);
        
        // Parse the file
        const parsedData = await parseResume(file.data);
        
        // Update progress to 100% and clear interval
        clearInterval(progressInterval);
        setProgress(100);
        
        // Update context with parsed data
        actions.setParsedResume(parsedData);
        setParsingStatus('success');
        
        // Notify parent component
        onParsingComplete(parsedData);
      } catch (error) {
        setParsingStatus('error');
        actions.dispatch({ 
          type: 'SET_PARSING_ERROR', 
          payload: error.message 
        });
        console.error('Error parsing resume:', error);
      }
    };

    parseFile();
  }, [file.data, actions, onParsingComplete]);

  const renderContent = () => {
    if (parsingStatus === 'parsing') {
      return (
        <div className="resume-parser__progress">
          <div className="resume-parser__progress-track">
            <div 
              className="resume-parser__progress-bar" 
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
          <p className="resume-parser__progress-text">
            Parsing your resume... {progress}%
          </p>
        </div>
      );
    }

    if (parsingStatus === 'error') {
      return (
        <div className="resume-parser__error">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
              stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <h3>Error Parsing Resume</h3>
          <p>{state.parsedResume.parsingError || 'Failed to parse resume file'}</p>
          <button 
            className="resume-parser__retry-btn"
            onClick={() => actions.clearFile()}
          >
            Try Another File
          </button>
        </div>
      );
    }

    if (parsingStatus === 'success') {
      return (
        <div className="resume-parser__success">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
              stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <h3>Resume Parsed Successfully</h3>
          <p>Moving to analysis...</p>
        </div>
      );
    }

    return (
      <div className="resume-parser__waiting">
        <p>Preparing to parse your resume...</p>
      </div>
    );
  };

  return (
    <div className="resume-parser">
      <h2>Processing Your Resume</h2>
      {renderContent()}
    </div>
  );
}

ResumeParser.propTypes = {
  onParsingComplete: PropTypes.func.isRequired
};

export default ResumeParser;