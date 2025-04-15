import PropTypes from 'prop-types';
import './DropZone.scss';

function DropZone({ getRootProps, getInputProps, isDragActive }) {
  return (
    <div 
      {...getRootProps()} 
      className={`drop-zone ${isDragActive ? 'drop-zone--active' : ''}`}
    >
      <input {...getInputProps()} aria-label="upload resume" />
      <div className="drop-zone__content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 16L12 8M12 8L15 11M12 8L9 11M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <p>{isDragActive 
          ? 'Drop your resume file here' 
          : 'Drag and drop your resume here, or click to browse'
        }</p>
      </div>
    </div>
  );
}

DropZone.propTypes = {
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  isDragActive: PropTypes.bool.isRequired
};

export default DropZone;