import { useState } from 'react';
import PropTypes from 'prop-types';
import './FeedbackList.scss';

function FeedbackList({ feedback }) {
  const [expandedItem, setExpandedItem] = useState(null);
  
  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };
  
  const getPriorityBadgeClass = (priority) => {
    const baseClass = 'feedback-list__priority-badge';
    
    switch (priority) {
      case 'high':
        return `${baseClass} ${baseClass}--high`;
      case 'medium':
        return `${baseClass} ${baseClass}--medium`;
      case 'low':
        return `${baseClass} ${baseClass}--low`;
      default:
        return baseClass;
    }
  };
  
  if (!feedback || feedback.length === 0) {
    return (
      <div className="feedback-list__empty">
        <p>No feedback available.</p>
      </div>
    );
  }
  
  return (
    <ul className="feedback-list">
      {feedback.map((item, index) => (
        <li 
          key={index} 
          className={`feedback-list__item ${expandedItem === index ? 'feedback-list__item--expanded' : ''}`}
          onClick={() => toggleItem(index)}
        >
          <div className="feedback-list__item-header">
            <div className="feedback-list__item-info">
              <span className="feedback-list__section">{item.section}</span>
              <span className={getPriorityBadgeClass(item.priority)}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </span>
            </div>
            <div className="feedback-list__item-issue">
              {item.issue}
            </div>
            <div className="feedback-list__item-toggle">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`feedback-list__toggle-icon ${expandedItem === index ? 'feedback-list__toggle-icon--open' : ''}`}
              >
                <path 
                  d="M19 9L12 16L5 9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          {expandedItem === index && (
            <div className="feedback-list__item-content">
              <h4>Suggestion:</h4>
              <p>{item.suggestion}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      suggestion: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired
    })
  ).isRequired
};

export default FeedbackList;