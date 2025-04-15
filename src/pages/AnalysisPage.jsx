import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeParser } from '../components/resume-analysis';
import { useResume } from '../context/ResumeContext';
import './AnalysisPage.scss';

function AnalysisPage() {
  const { state, actions } = useResume();
  const navigate = useNavigate();
  
  // Redirect to upload page if no file is uploaded
  useEffect(() => {
    if (!state.file.data) {
      navigate('/upload');
    }
  }, [state.file.data, navigate]);
  
  // Handle completion of parsing
  const handleParsingComplete = (parsedData) => {
    // Set the current step to 'analysis'
    actions.setCurrentStep('analysis');
    
    // Delay navigation to show the success message
    setTimeout(() => {
      navigate('/results');
    }, 1500);
  };
  
  return (
    <div className="analysis-page">
      <ResumeParser onParsingComplete={handleParsingComplete} />
    </div>
  );
}

export default AnalysisPage;