// src/components/layouts/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      // No need to navigate as the auth state change will trigger a re-render
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Resume Butler
        </Link>
        
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink to="/" className={({ isActive }) => 
                `header__nav-link ${isActive ? 'active' : ''}`
              }>
                Home
              </NavLink>
            </li>
            
            <li className="header__nav-item">
              <NavLink to="/upload" className={({ isActive }) => 
                `header__nav-link ${isActive ? 'active' : ''}`
              }>
                Upload
              </NavLink>
            </li>
            
            {isAuthenticated ? (
              <>
                <li className="header__nav-item">
                  <NavLink to="/dashboard" className={({ isActive }) => 
                    `header__nav-link ${isActive ? 'active' : ''}`
                  }>
                    Dashboard
                  </NavLink>
                </li>
                
                <li className="header__nav-item header__nav-item--user">
                  <div className="header__user-menu">
                    <span className="header__user-email">
                      {user?.email.split('@')[0]}
                    </span>
                    <div className="header__user-dropdown">
                      <NavLink to="/dashboard" className="header__dropdown-item">
                        Dashboard
                      </NavLink>
                      <button 
                        className="header__dropdown-item header__dropdown-item--button"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="header__nav-item">
                  <NavLink to="/login" className={({ isActive }) => 
                    `header__nav-link ${isActive ? 'active' : ''}`
                  }>
                    Sign In
                  </NavLink>
                </li>
                
                <li className="header__nav-item">
                  <NavLink to="/register" className={({ isActive }) => 
                    `header__nav-link header__nav-link--register ${isActive ? 'active' : ''}`
                  }>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            
            <li className="header__nav-item">
              <NavLink to="/testing" className={({ isActive }) => 
                `header__nav-link header__nav-link--testing ${isActive ? 'active' : ''}`
              }>
                Testing
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;