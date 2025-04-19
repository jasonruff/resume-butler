// src/services/authService.js
import supabase from './supabaseClient';

/**
 * Authentication service for Resume Butler application
 * Handles user registration, login, and session management
 */
export const authService = {
  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User data and session
   */
  async register(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) {
      console.error('Registration error:', error);
      throw new Error(`Registration failed: ${error.message}`);
    }
    
    return data;
  },
  
  /**
   * Login an existing user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User data and session
   */
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error:', error);
      throw new Error(`Login failed: ${error.message}`);
    }
    
    return data;
  },
  
  /**
   * Logout the current user
   * @returns {Promise<void>}
   */
  async logout() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      throw new Error(`Logout failed: ${error.message}`);
    }
  },
  
  /**
   * Get the current user session
   * @returns {Promise<Object>} User session or null if not authenticated
   */
  async getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Get session error:', error);
      throw new Error(`Failed to get session: ${error.message}`);
    }
    
    return data;
  },
  
  /**
   * Get the current user
   * @returns {Promise<Object>} User data or null if not authenticated
   */
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Get user error:', error);
      throw new Error(`Failed to get user: ${error.message}`);
    }
    
    return data.user;
  },
  
  /**
   * Reset password for a user
   * @param {string} email - User's email
   * @returns {Promise<void>}
   */
  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) {
      console.error('Reset password error:', error);
      throw new Error(`Password reset failed: ${error.message}`);
    }
  },
  
  /**
   * Update user's password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Updated user data
   */
  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      console.error('Update password error:', error);
      throw new Error(`Password update failed: ${error.message}`);
    }
    
    return data;
  }
};