/**
 * Mock implementation of the parser service for testing
 */

export const parseResume = jest.fn().mockImplementation((file) => {
  // Validate the file
  if (!file) {
    throw new Error('No file provided');
  }
  
  if (file.size === 0) {
    throw new Error('File is empty');
  }
  
  // Return mock parsed data
  return Promise.resolve({
    rawText: 'Sample resume content',
    sections: [
      { 
        title: 'Header', 
        content: 'John Doe\njohn.doe@example.com\n(123) 456-7890', 
        type: 'paragraph' 
      },
      { 
        title: 'EDUCATION', 
        content: 'University of Example\nBachelor of Science in Computer Science', 
        type: 'paragraph' 
      },
      { 
        title: 'EXPERIENCE', 
        content: 'Software Engineer, Example Corp\n- Developed web applications\n- Implemented new features',
        type: 'list'
      },
      { 
        title: 'SKILLS', 
        content: '- JavaScript\n- React\n- Node.js',
        type: 'list'
      }
    ],
    metadata: {
      totalWords: 42,
      languageIdentified: 'en'
    }
  });
});