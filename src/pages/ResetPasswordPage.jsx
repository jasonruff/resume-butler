// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import supabase from '../services/supabaseClient';
import './AuthPages.scss';

function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validResetLink, setValidResetLink] = useState(false);
  
  // Check if this is a valid password reset session
  useEffect(() => {
    const checkResetSession = async () => {
      try {
        // Get current user session
        const { data: { user } } = await supabase.auth.getUser();
        
        // If we have a user and they're using a recovery session, it's valid
        if (user) {
          setValidResetLink(true);
        } else {
          setError('Invalid or expired password reset link. Please request a new one.');
        }
      } catch (error) {
        setError('Error validating reset link. Please try again.');
      }
    };
    
    checkResetSession();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      
      // Validate inputs
      if (!password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      // Update password
      await updatePassword(password);
      
      // Redirect to login page
      navigate('/login', { 
        state: { message: 'Password reset successful. Please sign in with your new password.' } 
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Reset Password</h1>
        <p className="auth-description">
          Create a new password for your account.
        </p>
        
        {error && (
          <div className="auth-error">
            <p>{error}</p>
          </div>
        )}
        
        {validResetLink ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <p className="form-help">Password must be at least 6 characters long</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div className="auth-alt-action">
            <p>
              <Link to="/forgot-password" className="auth-link">
                Request a new password reset link
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;