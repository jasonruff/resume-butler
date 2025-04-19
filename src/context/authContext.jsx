// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import supabase from '../services/supabaseClient';

// Create context for authentication
const AuthContext = createContext();

// Provider component for authentication
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on load
  useEffect(() => {
    async function getInitialSession() {
      try {
        setLoading(true);
        
        // Get current session
        const { session } = await authService.getCurrentSession();
        
        if (session) {
          // Get user data
          const user = await authService.getCurrentUser();
          setSession(session);
          setUser(user);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    }
    
    getInitialSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  // Authentication methods
  const login = async (email, password) => {
    try {
      const { user, session } = await authService.login(email, password);
      setUser(user);
      setSession(session);
      return { user, session };
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (email, password) => {
    try {
      const { user, session } = await authService.register(email, password);
      setUser(user);
      setSession(session);
      return { user, session };
    } catch (error) {
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setSession(null);
    } catch (error) {
      throw error;
    }
  };
  
  const resetPassword = async (email) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };
  
  const updatePassword = async (newPassword) => {
    try {
      const { user } = await authService.updatePassword(newPassword);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Context value
  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}