/**
 * Load a mock file for testing
 * @param {string} filename - The name of the file to load
 * @returns {Promise<File>} A File object
 */
export const getMockFile = async (filename) => {
  const response = await fetch(`/src/mocks/files/${filename}`);
  const blob = await response.blob();
  return new File([blob], filename, { 
    type: filename.endsWith('.pdf') 
      ? 'application/pdf' 
      : filename.endsWith('.docx')
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'text/plain'
  });
};

/**
 * Generate a mock resume content
 * @returns {Object} Mock resume data
 */
export const generateMockResumeData = () => {
  return {
    rawText: `JOHN DOE
123 Main Street, New York, NY 10001
Phone: (555) 555-5555 | Email: john.doe@example.com

SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development.
Proficient in JavaScript, React, Node.js, and database technologies.

EXPERIENCE
SENIOR SOFTWARE ENGINEER
ABC Tech, New York, NY | January 2020 - Present
• Led development of customer-facing web application using React and Redux
• Implemented RESTful APIs using Node.js and Express
• Improved application performance by 40% through code optimization

SOFTWARE ENGINEER
XYZ Solutions, San Francisco, CA | June 2017 - December 2019
• Developed and maintained company's e-commerce platform
• Created automated testing suite that reduced bug detection time by 25%
• Collaborated with UX team to implement responsive design features

EDUCATION
BACHELOR OF SCIENCE IN COMPUTER SCIENCE
University of California, Berkeley | 2013-2017
GPA: 3.8/4.0

SKILLS
• Programming: JavaScript, TypeScript, Python, Java
• Frontend: React, Redux, HTML, CSS, SASS
• Backend: Node.js, Express, RESTful APIs
• Databases: MongoDB, PostgreSQL, MySQL
• Tools: Git, JIRA, Docker, AWS`,
    sections: [
      {
        title: 'Header',
        content: 'JOHN DOE\n123 Main Street, New York, NY 10001\nPhone: (555) 555-5555 | Email: john.doe@example.com',
        type: 'paragraph'
      },
      {
        title: 'SUMMARY',
        content: 'Experienced software engineer with 5+ years of experience in full-stack development.\nProficient in JavaScript, React, Node.js, and database technologies.',
        type: 'paragraph'
      },
      {
        title: 'EXPERIENCE',
        content: 'SENIOR SOFTWARE ENGINEER\nABC Tech, New York, NY | January 2020 - Present\n• Led development of customer-facing web application using React and Redux\n• Implemented RESTful APIs using Node.js and Express\n• Improved application performance by 40% through code optimization\n\nSOFTWARE ENGINEER\nXYZ Solutions, San Francisco, CA | June 2017 - December 2019\n• Developed and maintained company's e-commerce platform\n• Created automated testing suite that reduced bug detection time by 25%\n• Collaborated with UX team to implement responsive design features',
        type: 'list'
      },
      {
        title: 'EDUCATION',
        content: 'BACHELOR OF SCIENCE IN COMPUTER SCIENCE\nUniversity of California, Berkeley | 2013-2017\nGPA: 3.8/4.0',
        type: 'paragraph'
      },
      {
        title: 'SKILLS',
        content: '• Programming: JavaScript, TypeScript, Python, Java\n• Frontend: React, Redux, HTML, CSS, SASS\n• Backend: Node.js, Express, RESTful APIs\n• Databases: MongoDB, PostgreSQL, MySQL\n• Tools: Git, JIRA, Docker, AWS',
        type: 'list'
      }
    ],
    metadata: {
      totalWords: 179,
      languageIdentified: 'en'
    }
  };
};