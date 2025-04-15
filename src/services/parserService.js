import { PDFParser } from './parsers/PDFParser';
import { DOCXParser } from './parsers/DOCXParser';
import { ContentStructurer } from './parsers/ContentStructurer';

/**
 * Parses a resume file and returns structured content
 * @param {File} file - The resume file
 * @returns {Promise<Object>} Structured resume data
 */
export const parseResume = async (file) => {
  try {
    let rawText = '';
    
    // Parse the file based on its type
    if (file.type === 'application/pdf') {
      rawText = await PDFParser.parse(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      rawText = await DOCXParser.parse(file);
    } else {
      throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }
    
    // Structure the parsed content
    const structuredContent = ContentStructurer.structure(rawText);
    
    return {
      rawText,
      sections: structuredContent.sections,
      metadata: {
        totalWords: countWords(rawText),
        languageIdentified: detectLanguage(rawText)
      }
    };
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
};

/**
 * Count the total words in the text
 * @param {string} text - The text to count words in
 * @returns {number} The number of words
 */
const countWords = (text) => {
  return text.trim().split(/\s+/).length;
};

/**
 * Detect the language of the text (simplified version)
 * @param {string} text - The text to detect language for
 * @returns {string} The detected language code
 */
const detectLanguage = (text) => {
  // This is a simplified implementation
  // For a real app, use a proper language detection library or API
  
  // Check for common English words
  const englishWords = ['the', 'and', 'of', 'to', 'in', 'a', 'for', 'with', 'on', 'as'];
  const englishCount = englishWords.filter(word => 
    text.toLowerCase().includes(` ${word} `)
  ).length;
  
  // Check for common Spanish words
  const spanishWords = ['el', 'la', 'de', 'en', 'y', 'a', 'por', 'con', 'para', 'un'];
  const spanishCount = spanishWords.filter(word => 
    text.toLowerCase().includes(` ${word} `)
  ).length;
  
  // Simple comparison (in a real app, use more sophisticated detection)
  return englishCount >= spanishCount ? 'en' : 'es';
};