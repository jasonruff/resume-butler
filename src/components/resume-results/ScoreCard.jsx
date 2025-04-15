import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ScoreCard.scss';

function ScoreCard({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const duration = 1500; // Animation duration in ms
    const steps = 60; // Number of steps in animation
    const stepDuration = duration / steps;
    const increment = score / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedScore(prev => {
        const newScore = prev + increment;
        return newScore >= score ? score : newScore;
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [score]);
  
  // Determine score rating and color based on score value
  const getScoreRating = () => {
    if (score >= 80) return { text: 'Excellent', color: '#10b981' };
    if (score >= 70) return { text: 'Good', color: '#22c55e' };
    if (score >= 60) return { text: 'Average', color: '#f59e0b' };
    if (score >= 50) return { text: 'Needs Improvement', color: '#f97316' };
    return { text: 'Poor', color: '#ef4444' };
  };
  
  const { text: scoreRating, color: scoreColor } = getScoreRating();
  
  return (
    <div className="score-card" data-testid="ats-score">
      <div className="score-card__header">
        <h3>ATS Compatibility Score</h3>
        <p>How well your resume will perform with Applicant Tracking Systems</p>
      </div>
      
      <div className="score-card__content">
        <div 
          className="score-card__chart" 
          style={{ '--score-percentage': `${Math.round(animatedScore)}%`, '--score-color': scoreColor }}
        >
          <div className="score-card__chart-value">
            <span className="score-card__chart-number">{Math.round(animatedScore)}</span>
            <span className="score-card__chart-percent">%</span>
          </div>
        </div>
        
        <div className="score-card__rating">
          <span className="score-card__rating-label">Rating:</span>
          <span 
            className="score-card__rating-value"
            style={{ color: scoreColor }}
          >
            {scoreRating}
          </span>
        </div>
      </div>
    </div>
  );
}

ScoreCard.propTypes = {
  score: PropTypes.number.isRequired
};

export default ScoreCard;