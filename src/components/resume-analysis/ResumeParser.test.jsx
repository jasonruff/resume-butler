import { render, screen, waitFor } from '@testing-library/react';
import { ResumeProvider } from '../../context/ResumeContext';
import ResumeParser from './ResumeParser';
import { validPdfFile } from '../../utils/testing/mockFiles';
import { parseResume } from '../../services/parserService';

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

describe('ResumeParser Component', () => {
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
        data: validPdfFile,
        name: validPdfFile.name,
        type: validPdfFile.type,
        size: validPdfFile.size,
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
    expect(await screen.findByText(/Parsing your resume/i)).toBeInTheDocument();
    
    // Wait for parsing to complete
    await waitFor(() => {
      expect(screen.getByText('Resume Parsed Successfully')).toBeInTheDocument();
    });
    
    // Verify the callback was called
    expect(mockOnParsingComplete).toHaveBeenCalled();
  });
  
  test('handles parsing error correctly', async () => {
    // Mock the parser service to throw an error
    parseResume.mockImplementationOnce(() => 
      Promise.reject(new Error('Failed to parse PDF'))
    );
    
    // Mock initial state with a file
    const mockState = {
      file: {
        data: validPdfFile,
        name: validPdfFile.name,
        type: validPdfFile.type,
        size: validPdfFile.size,
        uploadProgress: 100,
        uploadError: null
      }
    };
    
    render(
      <ResumeProvider initialState={mockState}>
        <ResumeParser onParsingComplete={mockOnParsingComplete} />
      </ResumeProvider>
    );
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error parsing resume/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to parse PDF/i)).toBeInTheDocument();
    });
    
    // The completion callback should not be called when there's an error
    expect(mockOnParsingComplete).not.toHaveBeenCalled();
  });
  
  test('updates context with parsed resume data', async () => {
    // Mock the parsed resume data
    const mockParsedData = {
      rawText: 'John Doe Resume',
      sections: [
        { title: 'Education', content: 'University of Example', type: 'paragraph' },
        { title: 'Experience', content: 'Software Engineer', type: 'paragraph' }
      ],
      metadata: {
        totalWords: 25,
        languageIdentified: 'en'
      }
    };
    
    parseResume.mockImplementationOnce(() => Promise.resolve(mockParsedData));
    
    // Mock dispatch function to check context updates
    const mockDispatch = jest.fn();
    
    // Mock the useReducer hook
    jest.spyOn(React, 'useReducer').mockImplementation(() => [
      {
        file: {
          data: validPdfFile,
          name: validPdfFile.name,
          type: validPdfFile.type,
          size: validPdfFile.size,
          uploadProgress: 100
        },
        parsedResume: {}
      },
      mockDispatch
    ]);
    
    render(
      <ResumeProvider>
        <ResumeParser onParsingComplete={mockOnParsingComplete} />
      </ResumeProvider>
    );
    
    // Wait for parsing to complete
    await waitFor(() => {
      // Check that the SET_PARSED_RESUME action was dispatched with correct data
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_PARSED_RESUME',
        payload: mockParsedData
      });
    });
  });
});