import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Resume Butler
        </Link>
        
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/upload" className="header__nav-link">Upload</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/testing" className="header__nav-link header__nav-link--testing">Testing</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;