import { useState } from 'react';
import PropTypes from 'prop-types';
import './OptimizedContent.scss';

function OptimizedContent({ optimizedContent, originalSections }) {
  const [activeSection, setActiveSection] = useState(
    optimizedContent?.sections && optimizedContent.sections.length > 0 
      ? optimizedContent.sections[0].title 
      : null
  );
  
  if (!optimizedContent || !optimizedContent.sections || optimizedContent.sections.length === 0) {
    return (
      <div className="optimized-content__empty">
        <p>No optimized content available.</p>
      </div>
    );
  }
  
  const handleSelectSection = (sectionTitle) => {
    setActiveSection(sectionTitle);
  };
  
  // Find the active section in optimized content
  const activeOptimizedSection = optimizedContent.sections.find(
    section => section.title === activeSection
  );
  
  // Find the corresponding original section
  const originalSection = originalSections.find(
    section => section.title === activeSection
  );
  
  return (
    <div className="optimized-content">
      <div className="optimized-content__selector">
        <label htmlFor="section-select" className="optimized-content__selector-label">
          Choose section:
        </label>
        <select 
          id="section-select"
          className="optimized-content__selector-dropdown"
          value={activeSection || ''}
          onChange={(e) => handleSelectSection(e.target.value)}
        >
          {optimizedContent.sections.map((section, index) => (
            <option key={index} value={section.title}>
              {section.title}
            </option>
          ))}
        </select>
      </div>
      
      {activeOptimizedSection && (
        <div className="optimized-content__comparison">
          <div className="optimized-content__column">
            <h3 className="optimized-content__column-header">Original</h3>
            <div className="optimized-content__content-box">
              {originalSection ? (
                <pre className="optimized-content__text">
                  {originalSection.content}
                </pre>
              ) : (
                <p className="optimized-content__not-found">
                  Original section not found
                </p>
              )}
            </div>
          </div>
          
          <div className="optimized-content__column">
            <h3 className="optimized-content__column-header optimized-content__column-header--optimized">
              Optimized
            </h3>
            <div className="optimized-content__content-box optimized-content__content-box--optimized">
              <pre className="optimized-content__text">
                {activeOptimizedSection.content}
              </pre>
            </div>
          </div>
        </div>
      )}
      
      <div className="optimized-content__actions">
        <button className="optimized-content__action-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copy Optimized Content
        </button>
      </div>
    </div>
  );
}

OptimizedContent.propTypes = {
  optimizedContent: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  originalSections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      type: PropTypes.string
    })
  ).isRequired
};

export default OptimizedContent;