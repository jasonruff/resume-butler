import { render, screen, fireEvent } from '@testing-library/react';
import { ResumeProvider } from '../../context/ResumeContext';
import FileUploader from './FileUploader';

// Mock react-dropzone
jest.mock('react-dropzone', () => ({
  useDropzone: () => ({
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    isDragActive: false
  })
}));

describe('FileUploader', () => {
  const mockOnUploadComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <ResumeProvider>
        <FileUploader onUploadComplete={mockOnUploadComplete} />
      </ResumeProvider>
    );

    expect(screen.getByText('Upload Your Resume')).toBeInTheDocument();
    expect(screen.getByText('Accepted file formats: PDF, DOCX')).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 5MB')).toBeInTheDocument();
    expect(screen.getByLabelText('upload resume')).toBeInTheDocument();
  });

  test('shows validation error for invalid file type', () => {
    // This test would need more setup to trigger the file validation
    // and check if the error message is displayed correctly
  });
  
  test('shows upload progress when file is uploading', () => {
    // This test would check if the progress bar is displayed and updated
  });
  
  test('calls onUploadComplete when upload finishes', () => {
    // This test would verify that the callback is triggered on completion
  });
});