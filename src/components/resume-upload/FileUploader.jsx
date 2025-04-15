import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useResume } from '../../context/ResumeContext';
import DropZone from './DropZone';
import FileValidator from './FileValidator';
import UploadProgress from './UploadProgress';
import './FileUploader.scss';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

function FileUploader({ onUploadComplete }) {
  const { state, actions } = useResume();
  const { file } = state;
  const [validationError, setValidationError] = useState(null);

  const validateFile = (file) => {
    // Check file type
    if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
      return 'Only PDF and DOCX files are allowed';
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB';
    }
    
    return null;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (!uploadedFile) return;

    const error = validateFile(uploadedFile);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    
    // Set the file in context
    actions.setFile(uploadedFile);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      actions.updateUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        onUploadComplete(uploadedFile);
      }
    }, 200);
    
  }, [actions, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1
  });

  const renderContent = () => {
    if (file.uploadProgress > 0 && file.uploadProgress < 100) {
      return <UploadProgress progress={file.uploadProgress} />;
    }
    
    if (file.uploadError) {
      return (
        <div className="file-uploader__error">
          <p>{file.uploadError}</p>
          <button onClick={() => actions.clearFile()}>Try Again</button>
        </div>
      );
    }
    
    return (
      <>
        <DropZone 
          getRootProps={getRootProps} 
          getInputProps={getInputProps} 
          isDragActive={isDragActive} 
        />
        {validationError && <FileValidator error={validationError} />}
      </>
    );
  };

  return (
    <div className="file-uploader">
      <h2>Upload Your Resume</h2>
      <p>Drag and drop your resume file or click to browse</p>
      {renderContent()}
      <div className="file-uploader__info">
        <p>Accepted file formats: PDF, DOCX</p>
        <p>Maximum file size: 5MB</p>
      </div>
    </div>
  );
}

FileUploader.propTypes = {
  onUploadComplete: PropTypes.func.isRequired
};

export default FileUploader;