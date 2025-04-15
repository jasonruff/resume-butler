import { render, screen } from '@testing-library/react';
import { ResumeProvider, useResume } from './ResumeContext';
import { act } from 'react-dom/test-utils';
import { validPdfFile } from '../utils/testing/mockFiles';

// Test component that uses the resume context
function TestComponent() {
  const { state, actions } = useResume();
  
  return (
    <div>
      <div data-testid="current-step">{state.ui.currentStep}</div>
      <button 
        onClick={() => actions.setCurrentStep('analysis')}
        data-testid="set-step-button"
      >
        Change Step
      </button>
      
      <button 
        onClick={() => actions.setFile(validPdfFile)}
        data-testid="set-file-button"
      >
        Set File
      </button>
      
      <button
        onClick={() => actions.updateUploadProgress(75)}
        data-testid="update-progress-button"
      >
        Update Progress
      </button>
      
      {state.file.data && (
        <div data-testid="file-name">{state.file.name}</div>
      )}
      
      {state.file.uploadProgress > 0 && (
        <div data-testid="upload-progress">{state.file.uploadProgress}</div>
      )}
    </div>
  );
}

describe('ResumeContext', () => {
  test('provides initial state', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    expect(screen.getByTestId('current-step')).toHaveTextContent('upload');
  });
  
  test('allows changing the current step', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('current-step')).toHaveTextContent('upload');
    
    // Change step
    act(() => {
      screen.getByTestId('set-step-button').click();
    });
    
    // Verify step was changed
    expect(screen.getByTestId('current-step')).toHaveTextContent('analysis');
  });
  
  test('allows setting file data', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    // Initially no file
    expect(screen.queryByTestId('file-name')).not.toBeInTheDocument();
    
    // Set file
    act(() => {
      screen.getByTestId('set-file-button').click();
    });
    
    // Verify file data was set
    expect(screen.getByTestId('file-name')).toHaveTextContent('resume.pdf');
  });
  
  test('allows updating upload progress', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    // Initially no progress
    expect(screen.queryByTestId('upload-progress')).not.toBeInTheDocument();
    
    // First set a file (progress is tied to a file)
    act(() => {
      screen.getByTestId('set-file-button').click();
    });
    
    // Update progress
    act(() => {
      screen.getByTestId('update-progress-button').click();
    });
    
    // Verify progress was updated
    expect(screen.getByTestId('upload-progress')).toHaveTextContent('75');
  });
  
  test('throws error when useResume is used outside of provider', () => {
    // Suppress console.error for this test
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Render TestComponent outside of provider should throw
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useResume must be used within a ResumeProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});