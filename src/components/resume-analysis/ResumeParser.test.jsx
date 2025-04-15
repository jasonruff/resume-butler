import { render, screen, waitFor } from '@testing-library/react';
import { ResumeProvider } from '../../context/ResumeContext';
import ResumeParser from './ResumeParser';

// Mock the parserService
jest.mock('../../services/parserService', () => ({
  parseResume: jest.fn().mockImplementation(() => 
    Promise.resolve({
      rawText: 'Sample resume content',
      sections: [
        { title: 'Education', content: 'University of Example', type: 'paragraph' }
      ],
      metadata: {
        totalWords: 10,
        languageIdentified: 'en'
      }
    })
  )
}));

describe('ResumeParser', () => {
  const mockOnParsingComplete = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders initial state correctly', () => {
    render(
      <ResumeProvider>
        <ResumeParser onParsingComplete={mockOnParsingComplete} />
      </ResumeProvider>
    );
    
    expect(screen.getByText('Processing Your Resume')).toBeInTheDocument();
    expect(screen.getByText('Preparing to parse your resume...')).toBeInTheDocument();
  });
  
  test('shows progress when parsing starts', async () => {
    // Mock initial state with a file
    const mockState = {
      file: {
        data: new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' }),
        name: 'resume.pdf',
        type: 'application/pdf',
        size: 1024,
        uploadProgress: 100,
        uploadError: null
      }
    };
    
    render(
      <ResumeProvider initialState={mockState}>
        <ResumeParser onParsingComplete={mockOnParsingComplete} />
      </ResumeProvider>
    );
    
    // Check that the parsing progress is shown
    expect(await screen.findByText(/Parsing your resume/)).toBeInTheDocument();
    
    // Wait for parsing to complete
    await waitFor(() => {
      expect(screen.getByText('Resume Parsed Successfully')).toBeInTheDocument();
    });
    
    // Verify the callback was called
    expect(mockOnParsingComplete).toHaveBeenCalled();
  });
  
  // Additional tests would check error handling and other scenarios
});