/**
 * Llama 3 API integration service
 */
import * as mockApi from './mockLlamaApi';

// Check if we should use the mock API
const useRealApi = import.meta.env.VITE_USE_REAL_API === 'true';

/**
 * Analyzes resume content and returns feedback
 * @param {Object} resumeData - Parsed resume content
 * @param {string} jobDescription - Optional job description
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeResume = async (resumeData, jobDescription = null) => {
  // If we're not using the real API, use the mock API
  if (!useRealApi) {
    return mockApi.analyzeResume(resumeData, jobDescription);
  }
  
  try {
    // API endpoint URL
    const apiUrl = 'https://api.meta.ai/llama/v3/analyze';
    
    // Request body
    const requestBody = {
      resume_content: {
        text: resumeData.rawText,
        structure: {
          sections: resumeData.sections.map(section => ({
            title: section.title,
            content: section.content,
            type: section.type
          }))
        }
      },
      analysis_type: 'ats_optimization',
      response_format: 'detailed'
    };
    
    // Add job description if provided
    if (jobDescription) {
      requestBody.job_description = jobDescription;
    }
    
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_LLAMA_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    
    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze resume');
    }
    
    // Parse response
    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('Error calling Llama API:', error);
    throw error;
  }
};

/**
 * Requests optimized resume content
 * @param {Object} resumeData - Parsed resume content
 * @param {Object} analysisResults - Previous analysis results
 * @returns {Promise<Object>} Optimized resume content
 */
export const optimizeResume = async (resumeData, analysisResults) => {
  // If we're not using the real API, use the mock API
  if (!useRealApi) {
    return mockApi.optimizeResume(resumeData, analysisResults);
  }
  
  try {
    // In a real implementation, this would make another API call
    // For now, we'll just return the optimized content from the analysis results
    return {
      optimizedContent: analysisResults.optimizedContent
    };
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw error;
  }
};