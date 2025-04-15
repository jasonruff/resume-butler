import { render, screen } from '@testing-library/react';
import FileValidator from './FileValidator';

describe('FileValidator Component', () => {
  test('displays error message', () => {
    const errorMessage = 'Only PDF and DOCX files are allowed';
    render(<FileValidator error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  
  test('renders error icon', () => {
    render(<FileValidator error="Test error" />);
    
    // Check if the SVG error icon is present
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});