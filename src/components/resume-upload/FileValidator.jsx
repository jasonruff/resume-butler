import PropTypes from 'prop-types';
import './FileValidator.scss';

function FileValidator({ error }) {
  return (
    <div className="file-validator">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
          stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      <p className="file-validator__message">{error}</p>
    </div>
  );
}

FileValidator.propTypes = {
  error: PropTypes.string.isRequired
};

export default FileValidator;