import './Footer.scss';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            Resume Butler
          </div>
          
          <div className="footer__links">
            <div className="footer__link-group">
              <h4>About</h4>
              <ul>
                <li><a href="#">How it Works</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            
            <div className="footer__link-group">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Resume Tips</a></li>
                <li><a href="#">ATS Guide</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer__link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Resume Butler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;