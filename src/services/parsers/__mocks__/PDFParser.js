export class PDFParser {
  static async parse(file) {
    // For testing, we'll validate if the file is a PDF and return mock content
    if (file.type !== 'application/pdf') {
      throw new Error('Not a PDF file');
    }
    
    return `MOCK RESUME
JOHN DOE
123 Main St, Anytown, USA
john.doe@example.com

EDUCATION
University of Test, BS Computer Science

EXPERIENCE
Software Engineer, Test Company
- Developed web applications
- Implemented features

SKILLS
JavaScript, React, Node.js`;
  }
}