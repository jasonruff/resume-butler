import { Link } from 'react-router-dom';
import './HomePage.scss';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero__content">
          <h1>Resume Butler</h1>
          <p className="hero__subtitle">Your AI-powered resume optimization assistant</p>
          <p className="hero__description">
            Get instant feedback on your resume's ATS compatibility, personalized suggestions,
            and optimized content that helps you stand out to employers.
          </p>
          <Link to="/upload" className="hero__cta-button">
            Get Started
          </Link>
        </div>
      </section>
      
      <section className="features">
        <h2>How Resume Butler Works</h2>
        
        <div className="features__grid">
          <div className="features__card">
            <div className="features__icon">📄</div>
            <h3>Upload Your Resume</h3>
            <p>Upload your resume in PDF or DOCX format. We'll parse the content while keeping your data secure.</p>
          </div>
          
          <div className="features__card">
            <div className="features__icon">🔍</div>
            <h3>AI Analysis</h3>
            <p>Our AI-powered system analyzes your resume for ATS compatibility and provides a detailed score.</p>
          </div>
          
          <div className="features__card">
            <div className="features__icon">💡</div>
            <h3>Get Recommendations</h3>
            <p>Receive detailed feedback on how to improve your resume and make it more appealing to employers.</p>
          </div>
          
          <div className="features__card">
            <div className="features__icon">✨</div>
            <h3>Optimized Content</h3>
            <p>Get AI-generated optimized versions of your resume sections that are ATS-friendly.</p>
          </div>
        </div>
      </section>
      
      <section className="cta">
        <h2>Ready to Improve Your Resume?</h2>
        <p>Start now and get your resume optimized in minutes.</p>
        <Link to="/upload" className="cta__button">
          Optimize My Resume
        </Link>
      </section>
    </div>
  );
}

export default HomePage;