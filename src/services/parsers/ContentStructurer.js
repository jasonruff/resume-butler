/**
 * Service for structuring parsed resume content
 */
export class ContentStructurer {
  /**
   * Common resume section titles
   * @private
   */
  static _sectionTitles = [
    // Education sections
    'EDUCATION', 'ACADEMIC BACKGROUND', 'ACADEMIC HISTORY', 'ACADEMIC EXPERIENCE',
    // Experience sections
    'EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT HISTORY', 'PROFESSIONAL EXPERIENCE',
    'WORK HISTORY', 'CAREER HISTORY',
    // Skills sections
    'SKILLS', 'TECHNICAL SKILLS', 'PROFESSIONAL SKILLS', 'KEY SKILLS', 'CORE COMPETENCIES',
    'COMPETENCIES', 'QUALIFICATIONS',
    // Projects sections
    'PROJECTS', 'PROJECT EXPERIENCE', 'KEY PROJECTS',
    // Other common sections
    'SUMMARY', 'PROFESSIONAL SUMMARY', 'CAREER OBJECTIVE', 'OBJECTIVE', 'PROFILE',
    'CERTIFICATIONS', 'CERTIFICATES', 'AWARDS', 'HONORS', 'ACHIEVEMENTS',
    'LANGUAGES', 'REFERENCES', 'INTERESTS', 'VOLUNTEER EXPERIENCE', 'PUBLICATIONS'
  ];
  
  /**
   * Structure the raw text into organized sections
   * @param {string} rawText - The raw text content from the parsed resume
   * @returns {Object} Structured resume content with identified sections
   */
  static structure(rawText) {
    try {
      // Split text into lines and remove empty lines
      const lines = rawText.split(/\\r?\\n/).filter(line => line.trim().length > 0);
      
      // Identify sections in the resume
      const sections = this._identifySections(lines);
      
      return {
        sections
      };
    } catch (error) {
      console.error('Content structuring error:', error);
      // If structuring fails, return a basic structure with all content in one section
      return {
        sections: [
          {
            title: 'Resume Content',
            content: rawText,
            type: 'paragraph'
          }
        ]
      };
    }
  }
  
  /**
   * Identify sections in the resume based on common section titles
   * @param {string[]} lines - Array of text lines from the resume
   * @returns {Array} Array of identified sections with title and content
   * @private
   */
  static _identifySections(lines) {
    const sections = [];
    let currentSection = null;
    let currentContent = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this line might be a section title
      const isSectionTitle = this._isSectionTitle(line);
      
      if (isSectionTitle) {
        // If we were collecting content for a previous section, save it
        if (currentSection) {
          sections.push({
            title: currentSection,
            content: currentContent.join('\\n'),
            type: this._determineSectionType(currentContent)
          });
        }
        
        // Start a new section
        currentSection = line;
        currentContent = [];
      } else if (currentSection) {
        // Add this line to the current section's content
        currentContent.push(line);
      } else {
        // If we haven't identified a section yet, this might be a header/intro
        if (!currentSection) {
          currentSection = 'Header';
        }
        currentContent.push(line);
      }
    }
    
    // Add the last section if there is one
    if (currentSection) {
      sections.push({
        title: currentSection,
        content: currentContent.join('\\n'),
        type: this._determineSectionType(currentContent)
      });
    }
    
    return sections;
  }
  
  /**
   * Determine if a line is likely a section title
   * @param {string} line - The line to check
   * @returns {boolean} True if the line is likely a section title
   * @private
   */
  static _isSectionTitle(line) {
    // If line is all uppercase, it's likely a heading
    const isAllCaps = line === line.toUpperCase() && line.length > 3;
    
    // Check against our list of common section titles
    const isKnownTitle = this._sectionTitles.some(title => 
      line.toUpperCase() === title || 
      line.toUpperCase().includes(title)
    );
    
    // If the line is short, all caps, or a known title, it's probably a section title
    return (isAllCaps && line.length < 30) || isKnownTitle;
  }
  
  /**
   * Determine the type of content in a section (paragraph, list, etc.)
   * @param {string[]} contentLines - The lines of content in the section
   * @returns {string} The type of content ('heading', 'paragraph', or 'list')
   * @private
   */
  static _determineSectionType(contentLines) {
    // If most lines start with bullets or numbers, it's a list
    const listItemCount = contentLines.filter(line => 
      line.trim().startsWith('•') || 
      line.trim().startsWith('-') || 
      /^\\d+\\./.test(line.trim())
    ).length;
    
    if (listItemCount > contentLines.length * 0.3) {
      return 'list';
    }
    
    // Otherwise, assume it's a paragraph
    return 'paragraph';
  }
}