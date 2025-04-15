import { useNavigate } from 'react-router-dom';
import { FileUploader } from '../components/resume-upload';
import { useResume } from '../context/ResumeContext';
import './UploadPage.scss';

function UploadPage() {
  const { actions } = useResume();
  const navigate = useNavigate();
  
  const handleUploadComplete = (file) => {
    // Update current step in the UI state
    actions.setCurrentStep('parsing');
    
    // Navigate to analysis page
    navigate('/analysis');
  };
  
  return (
    <div className="upload-page">
      <div className="upload-page__container">
        <h1>Upload Your Resume</h1>
        <p className="upload-page__description">
          Upload your resume to get instant feedback on its ATS compatibility and suggestions for improvement.
        </p>
        
        <FileUploader onUploadComplete={handleUploadComplete} />
        
        <div className="upload-page__info">
          <h3>Why ATS Optimization Matters</h3>
          <p>
            Applicant Tracking Systems (ATS) are used by 99% of Fortune 500 companies to filter resumes.
            An optimized resume increases your chances of getting past these filters and landing an interview.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;