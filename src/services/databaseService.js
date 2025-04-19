// src/services/databaseService.js
import supabase from './supabaseClient';

/**
 * Database service for Resume Butler application
 * Handles all interactions with Supabase
 */
export const databaseService = {
  /**
   * Save resume analysis to database
   * @param {Object} data - Resume data and analysis results
   * @returns {Promise<Object>} Saved record
   */
  async saveResumeAnalysis(data) {
    const { 
      fileName, 
      fileType, 
      parsedResume, 
      analysisResults 
    } = data;
    
    // Get user ID if authenticated
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    
    // Create record in resume_analyses table
    const { data: record, error } = await supabase
      .from('resume_analyses')
      .insert({
        user_id: userId,
        file_name: fileName,
        file_type: fileType,
        raw_text: parsedResume.rawText,
        sections: parsedResume.sections,
        metadata: parsedResume.metadata,
        ats_score: analysisResults.atsScore,
        feedback: analysisResults.feedback,
        optimized_content: analysisResults.optimizedContent,
        keyword_analysis: analysisResults.keywordAnalysis,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving resume analysis:', error);
      throw new Error(`Failed to save resume analysis: ${error.message}`);
    }
    
    return record;
  },
  
  /**
   * Get user's resume analyses from database
   * @returns {Promise<Array>} User's resume analyses
   */
  async getUserResumeAnalyses() {
    // Get user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get user's resume analyses
    const { data: analyses, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting user resume analyses:', error);
      throw new Error(`Failed to get resume analyses: ${error.message}`);
    }
    
    return analyses;
  },
  
  /**
   * Get a specific resume analysis by ID
   * @param {string} id - Resume analysis ID
   * @returns {Promise<Object>} Resume analysis record
   */
  async getResumeAnalysis(id) {
    // Get analysis by ID
    const { data: analysis, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error getting resume analysis:', error);
      throw new Error(`Failed to get resume analysis: ${error.message}`);
    }
    
    return analysis;
  },
  
  /**
   * Delete a resume analysis
   * @param {string} id - Resume analysis ID
   * @returns {Promise<void>}
   */
  async deleteResumeAnalysis(id) {
    // Delete analysis by ID
    const { error } = await supabase
      .from('resume_analyses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting resume analysis:', error);
      throw new Error(`Failed to delete resume analysis: ${error.message}`);
    }
  }
};