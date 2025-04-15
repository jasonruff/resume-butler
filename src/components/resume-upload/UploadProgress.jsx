import PropTypes from 'prop-types';
import './UploadProgress.scss';

function UploadProgress({ progress }) {
  return (
    <div className="upload-progress">
      <div className="upload-progress__track">
        <div 
          className="upload-progress__bar" 
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        ></div>
      </div>
      <p className="upload-progress__text">Uploading... {progress}%</p>
    </div>
  );
}

UploadProgress.propTypes = {
  progress: PropTypes.number.isRequired
};

export default UploadProgress;