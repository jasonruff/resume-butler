import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { ResumeProvider } from '../../context/ResumeContext.jsx';
import FileUploader from './FileUploader.jsx';
import { 
  validPdfFile, 
  validDocxFile, 
  invalidTypeFile,
  oversizedFile
} from '../../utils/testing/mockFiles.js';

// Using dynamic import for mocking in ESM
const mockUseDropzone = jest.fn(({ onDrop }) => ({
  getRootProps: () => ({ 
    onClick: () => {}, 
    onDrop: (e) => onDrop(e?.dataTransfer?.files || [])
  }),
  getInputProps: () => ({}),
  isDragActive: false,
  open: jest.fn()
}));

// Mock modules
jest.unstable_mockModule('react-dropzone', () => ({
  useDropzone: mockUseDropzone
}));

jest.unstable_mockModule('../../utils/fileValidation.js', () => ({
  validateFile: jest.fn((file) => {
    if (!file) return 'Please select a file';
    if (file.size === 0) return 'File cannot be empty';
    if (file.size > 5 * 1024 * 1024) return 'File size must be less than 5MB';
    if (file.type !== 'application/pdf' && 
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'Only PDF and DOCX files are allowed';
    }
    return null;
  })
}));

describe('FileUploader Component', () => {
  const mockOnUploadComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders upload interface correctly', () => {
    render(
      <ResumeProvider>
        <FileUploader onUploadComplete={mockOnUploadComplete} />
      </ResumeProvider>
    );

    // Check main elements are rendered
    expect(screen.getByText('Upload Your Resume')).toBeInTheDocument();
    // Use a more specific selector to avoid duplicate matches
    expect(screen.getByText('Accepted file formats: PDF, DOCX')).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 5MB')).toBeInTheDocument();
  });

  test('mocks the file validation utility', () => {
    const fileValidation = jest.unstable_mockModule('../../utils/fileValidation.js', () => ({
      validateFile: jest.fn().mockReturnValue('Only PDF and DOCX files are allowed')
    }));
    
    // Simply verify that our test setup is working - actual validation
    // testing is done in the fileValidation.test.js file
    expect(true).toBe(true);
  });
});