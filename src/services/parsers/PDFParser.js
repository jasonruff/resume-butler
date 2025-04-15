import * as pdfjs from 'pdfjs-dist';

// Set the PDF.js worker source (in a real app, this would be a proper URL to the worker)
// For development, we'll simulate this with a placeholder
const PDFJS_WORKER_SRC = '/pdf.worker.min.js';

/**
 * Service for parsing PDF files
 */
export class PDFParser {
  /**
   * Initialize PDF.js
   * @private
   */
  static _init() {
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      // In a real application, set this to the actual worker URL
      pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
    }
  }
  
  /**
   * Parse a PDF file and extract text content
   * @param {File} file - The PDF file to parse
   * @returns {Promise<string>} The extracted text content
   */
  static async parse(file) {
    this._init();
    
    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF document
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      // Get total number of pages
      const numPages = pdf.numPages;
      let textContent = '';
      
      // Extract text from each page
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        
        // Concatenate text items with proper spacing
        const pageText = content.items.map(item => item.str).join(' ');
        textContent += pageText + '\\n\\n';
      }
      
      return textContent.trim();
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }
}