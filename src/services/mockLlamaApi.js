/**
 * Mock API service for Llama 3 integration
 * Used for development and testing
 */

/**
 * Analyzes resume content and returns feedback
 * @param {Object} resumeData - Parsed resume content
 * @param {string} jobDescription - Optional job description
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeResume = async (resumeData, jobDescription = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Determine the appropriate mock response based on resume content
  let mockResponse;
  
  // Use the number of sections as a simple heuristic for resume quality
  if (resumeData.sections.length < 3) {
    mockResponse = {
      atsScore: 35,
      feedback: [
        {
          section: 'Overall',
          issue: 'Incomplete resume',
          suggestion: 'Add more sections to your resume including skills, experience, and education',
          priority: 'high'
        },
        {
          section: 'Content',
          issue: 'Insufficient detail',
          suggestion: 'Provide more specifics about your experience and accomplishments',
          priority: 'high'
        }
      ],
      optimizedContent: {
        sections: [
          {
            title: 'Suggested Structure',
            content: 'Your resume should include: Contact Information, Professional Summary, Work Experience, Education, Skills, and Additional Sections (like certifications or projects)'
          }
        ]
      },
      keywordAnalysis: {
        missingKeywords: ['skills', 'experience', 'education', 'contact information'],
        recommendedAdditions: ['quantifiable achievements', 'employment dates', 'technical skills']
      }
    };
  } else if (resumeData.sections.length < 5) {
    mockResponse = {
      atsScore: 65,
      feedback: [
        {
          section: 'Skills',
          issue: 'Skills section could be improved',
          suggestion: 'Add more relevant technical skills and organize them by category',
          priority: 'medium'
        },
        {
          section: 'Experience',
          issue: 'Bullet points lack metrics',
          suggestion: 'Add quantifiable achievements to your experience bullet points',
          priority: 'high'
        }
      ],
      optimizedContent: {
        sections: [
          {
            title: 'Skills',
            content: 'Technical: JavaScript, React, Node.js, Express, SQL, MongoDB\nSoft Skills: Communication, Teamwork, Problem-solving, Time management'
          },
          {
            title: 'Experience',
            content: 'Include 3-5 bullet points per position with measurable achievements'
          }
        ]
      },
      keywordAnalysis: {
        missingKeywords: ['project management', 'agile', 'cross-functional'],
        recommendedAdditions: ['teamwork', 'problem-solving', 'communication']
      }
    };
  } else {
    mockResponse = {
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
            title: 'Skills',
            content: 'Programming: JavaScript, TypeScript, Python, Java\nFrontend: React, Redux, HTML, CSS, SASS\nBackend: Node.js, Express, RESTful APIs\nDatabases: MongoDB, PostgreSQL, MySQL\nTools: Git, JIRA, Docker, AWS, Agile, Scrum'
          },
          {
            title: 'Experience',
            content: 'SENIOR SOFTWARE ENGINEER\nABC Tech, New York, NY | January 2020 - Present\n• Led development of customer-facing web application, increasing user engagement by 35%\n• Implemented RESTful APIs reducing data retrieval time by 40%\n• Optimized application code, improving overall performance by 40%'
          }
        ]
      },
      keywordAnalysis: {
        missingKeywords: ['project management', 'agile', 'scrum', 'stakeholder communication'],
        recommendedAdditions: ['kanban', 'CI/CD', 'code review', 'mentorship']
      }
    };
  }
  
  // Add job-specific feedback if a job description was provided
  if (jobDescription) {
    mockResponse.feedback.push({
      section: 'Job Alignment',
      issue: 'Resume not sufficiently targeted to the specific job',
      suggestion: 'Customize your resume to highlight experiences relevant to this specific position',
      priority: 'high'
    });
    
    // Add some dummy job-specific keywords
    mockResponse.keywordAnalysis.missingKeywords.push('leadership', 'team management');
  }
  
  return mockResponse;
};

/**
 * Requests optimized resume content
 * @param {Object} resumeData - Parsed resume content
 * @param {Object} analysisResults - Previous analysis results
 * @returns {Promise<Object>} Optimized resume content
 */
export const optimizeResume = async (resumeData, analysisResults) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return the optimized content from the analysis results
  return {
    optimizedContent: analysisResults.optimizedContent
  };
};