export class DOCXParser {
  static async parse(file) {
    // For testing, we'll validate if the file is a DOCX and return mock content
    if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      throw new Error('Not a DOCX file');
    }
    
    return `MOCK RESUME
JANE DOE
456 Secondary St, Testville, USA
jane.doe@example.com

EDUCATION
Test University, MS Data Science

EXPERIENCE
Data Scientist, Analytics Corp
- Analyzed large datasets
- Built predictive models

SKILLS
Python, SQL, Machine Learning`;
  }
}