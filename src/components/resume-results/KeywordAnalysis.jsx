import PropTypes from 'prop-types';
import './KeywordAnalysis.scss';

function KeywordAnalysis({ keywordAnalysis }) {
  const { missingKeywords, recommendedAdditions } = keywordAnalysis;
  
  return (
    <div className="keyword-analysis">
      <div className="keyword-analysis__section">
        <h3 className="keyword-analysis__title">Missing Keywords</h3>
        <p className="keyword-analysis__description">
          Keywords that may be expected by ATS systems but are missing from your resume:
        </p>
        {missingKeywords && missingKeywords.length > 0 ? (
          <div className="keyword-analysis__tags">
            {missingKeywords.map((keyword, index) => (
              <span key={index} className="keyword-analysis__tag keyword-analysis__tag--missing">
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="keyword-analysis__empty">No missing keywords detected.</p>
        )}
      </div>
      
      <div className="keyword-analysis__section">
        <h3 className="keyword-analysis__title">Recommended Additions</h3>
        <p className="keyword-analysis__description">
          Keywords that would strengthen your resume and improve ATS compatibility:
        </p>
        {recommendedAdditions && recommendedAdditions.length > 0 ? (
          <div className="keyword-analysis__tags">
            {recommendedAdditions.map((keyword, index) => (
              <span key={index} className="keyword-analysis__tag keyword-analysis__tag--recommended">
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="keyword-analysis__empty">No additional recommendations.</p>
        )}
      </div>
      
      <div className="keyword-analysis__tip">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>
          Pro tip: Include keywords naturally throughout your resume. Focus on the terms most relevant to your target roles.
        </p>
      </div>
    </div>
  );
}

KeywordAnalysis.propTypes = {
  keywordAnalysis: PropTypes.shape({
    missingKeywords: PropTypes.arrayOf(PropTypes.string),
    recommendedAdditions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default KeywordAnalysis;