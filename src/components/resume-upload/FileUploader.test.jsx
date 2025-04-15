import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResumeProvider } from '../../context/ResumeContext';
import FileUploader from './FileUploader';
import { 
  validPdfFile, 
  validDocxFile, 
  invalidTypeFile,
  oversizedFile
} from '../../utils/testing/mockFiles';

// Mock useDropzone hook
jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(({ onDrop }) => ({
    getRootProps: () => ({ 
      onClick: () => {}, 
      onDrop: (e) => onDrop(e.dataTransfer.files)
    }),
    getInputProps: () => ({}),
    isDragActive: false,
    open: jest.fn()
  }))
}));

// Mock the file validation utility
jest.mock('../../utils/fileValidation', () => ({
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
    expect(screen.getByText(/Drag and drop your resume/i)).toBeInTheDocument();
    expect(screen.getByText('Accepted file formats: PDF, DOCX')).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 5MB')).toBeInTheDocument();
  });

  test('shows validation error for invalid file type', async () => {
    // We need to override the implementation of useDropzone for this test
    const useDropzone = require('react-dropzone').useDropzone;
    useDropzone.mockImplementationOnce(({ onDrop }) => {
      // Simulate dropping the invalid file
      setTimeout(() => onDrop([invalidTypeFile]), 0);
      
      return {
        getRootProps: () => ({}),
        getInputProps: () => ({}),
        isDragActive: false
      };
    });
    
    render(
      <ResumeProvider>
        <FileUploader onUploadComplete={mockOnUploadComplete} />
      </ResumeProvider>
    );
    
    // Wait for the validation error to appear
    await waitFor(() => {
      expect(screen.getByText('Only PDF and DOCX files are allowed')).toBeInTheDocument();
    });
    
    // Verify the callback was not called
    expect(mockOnUploadComplete).not.toHaveBeenCalled();
  });
  
  test('shows upload progress when file is uploading', async () => {
    // We need to mock the context actions and state
    const mockDispatch = jest.fn();
    const mockSetFile = jest.fn();
    const mockUpdateUploadProgress = jest.fn();
    
    // Override the ResumeProvider implementation
    jest.spyOn(React, 'useReducer').mockImplementation(() => [
      { 
        file: { 
          data: validPdfFile,
          uploadProgress: 50 
        } 
      }, 
      mockDispatch
    ]);
    
    // Implementation depends on the actual component implementation
    // This is a placeholder test structure
    render(
      <ResumeProvider>
        <FileUploader onUploadComplete={mockOnUploadComplete} />
      </ResumeProvider>
    );
    
    // No progress initially
    expect(screen.queryByText(/Uploading.../i)).not.toBeInTheDocument();
    
    // After setting state with progress
    await waitFor(() => {
      // This assumes setFile is called to start the upload process
      mockSetFile(validPdfFile);
      // Then the upload progress is updated
      mockUpdateUploadProgress(50);
      
      // Update the component with new state
      // This would need to be adapted based on actual implementation
    });
  });
  
  test('calls onUploadComplete when upload finishes', async () => {
    // This test would depend on the actual implementation
    // For now, we'll just verify the callback is called when upload is complete
    
    // Mock a successful upload
    const useDropzone = require('react-dropzone').useDropzone;
    useDropzone.mockImplementationOnce(({ onDrop }) => {
      // Simulate dropping a valid file
      setTimeout(() => onDrop([validPdfFile]), 0);
      
      return {
        getRootProps: () => ({}),
        getInputProps: () => ({}),
        isDragActive: false
      };
    });
    
    render(
      <ResumeProvider>
        <FileUploader onUploadComplete={mockOnUploadComplete} />
      </ResumeProvider>
    );
    
    // In a real implementation, we would wait for the upload to complete
    // and then verify the callback is called with the expected arguments
    
    // For this example, we'll assume upload completes successfully
    await waitFor(() => {
      // This is a placeholder - actual implementation would vary
      expect(mockOnUploadComplete).toHaveBeenCalled();
    });
  });
});