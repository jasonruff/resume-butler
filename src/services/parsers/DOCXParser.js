import mammoth from 'mammoth';

/**
 * Service for parsing DOCX files
 */
export class DOCXParser {
  /**
   * Parse a DOCX file and extract text content
   * @param {File} file - The DOCX file to parse
   * @returns {Promise<string>} The extracted text content
   */
  static async parse(file) {
    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Use mammoth.js to convert DOCX to HTML
      const result = await mammoth.extractRawText({
        arrayBuffer: arrayBuffer
      });
      
      // Extract text content from result
      const textContent = result.value;
      
      // Check if we got any content
      if (!textContent || textContent.trim().length === 0) {
        throw new Error('No content could be extracted from the DOCX file');
      }
      
      return textContent.trim();
    } catch (error) {
      console.error('DOCX parsing error:', error);
      throw new Error(`Failed to parse DOCX: ${error.message}`);
    }
  }
}