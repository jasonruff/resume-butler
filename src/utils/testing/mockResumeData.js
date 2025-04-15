/**
 * Mock resume data for testing the application flow
 */

export const mockResumeFile = {
  data: new File(
    ['Test Resume Content'], 
    'sample-resume.pdf', 
    { type: 'application/pdf' }
  ),
  name: 'sample-resume.pdf',
  type: 'application/pdf',
  size: 1024,
  uploadProgress: 100,
  uploadError: null
};

export const mockParsedResume = {
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
      content: 'SENIOR SOFTWARE ENGINEER\nABC Tech, New York, NY | January 2020 - Present\n• Led development of customer-facing web application using React and Redux\n• Implemented RESTful APIs using Node.js and Express\n• Improved application performance by 40% through code optimization\n\nSOFTWARE ENGINEER\nXYZ Solutions, San Francisco, CA | June 2017 - December 2019\n• Developed and maintained company\'s e-commerce platform\n• Created automated testing suite that reduced bug detection time by 25%\n• Collaborated with UX team to implement responsive design features',
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
  },
  parsingError: null
};

export const mockAnalysisResults = {
  atsScore: 85,
  feedback: [
    {
      section: 'Skills',
      issue: 'Missing keywords',
      suggestion: 'Consider adding industry-specific keywords like "project management", "agile", and "scrum"',
      priority: 'high'
    },
    {
      section: 'Experience',
      issue: 'Bullet points too verbose',
      suggestion: 'Shorten bullet points to 1-2 lines focused on achievements with metrics',
      priority: 'medium'
    },
    {
      section: 'Education',
      issue: 'Formatting inconsistency',
      suggestion: 'Use consistent date format throughout all sections',
      priority: 'low'
    }
  ],
  optimizedContent: {
    sections: [
      {
        title: 'SUMMARY',
        content: 'Results-driven Software Engineer with 5+ years of experience in full-stack development. Proven expertise in JavaScript, React, Node.js, and database technologies. Dedicated to delivering high-performance applications with clean, maintainable code.'
      },
      {
        title: 'EXPERIENCE',
        content: 'SENIOR SOFTWARE ENGINEER\nABC Tech, New York, NY | Jan 2020 - Present\n• Led development of React/Redux web application, increasing user engagement by 35%\n• Built RESTful APIs using Node.js/Express, reducing data retrieval time by 40%\n• Optimized application performance by 40% through code refactoring and caching\n\nSOFTWARE ENGINEER\nXYZ Solutions, San Francisco, CA | Jun 2017 - Dec 2019\n• Developed e-commerce platform serving 10,000+ daily users\n• Created automated testing suite reducing bug detection time by 25%\n• Implemented responsive design features, improving mobile conversion by 20%'
      },
      {
        title: 'SKILLS',
        content: '• Programming: JavaScript, TypeScript, Python, Java\n• Frontend: React, Redux, HTML, CSS, SASS\n• Backend: Node.js, Express, RESTful APIs\n• Databases: MongoDB, PostgreSQL, MySQL\n• Development: Git, JIRA, Docker, AWS, Agile, Scrum'
      },
      {
        title: 'EDUCATION',
        content: 'BACHELOR OF SCIENCE IN COMPUTER SCIENCE\nUniversity of California, Berkeley | Aug 2013 - May 2017\nGPA: 3.8/4.0'
      }
    ]
  },
  keywordAnalysis: {
    missingKeywords: ['project management', 'agile', 'scrum', 'stakeholder communication'],
    recommendedAdditions: ['kanban', 'CI/CD', 'code review', 'mentorship']
  }
};