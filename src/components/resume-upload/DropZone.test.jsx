import { render, screen } from '@testing-library/react';
import DropZone from './DropZone';

describe('DropZone Component', () => {
  const mockProps = {
    getRootProps: jest.fn().mockReturnValue({}),
    getInputProps: jest.fn().mockReturnValue({}),
    isDragActive: false
  };

  test('renders correctly in normal state', () => {
    render(<DropZone {...mockProps} />);
    
    expect(screen.getByText(/Drag and drop your resume here/i)).toBeInTheDocument();
    expect(screen.getByLabelText('upload resume')).toBeInTheDocument();
  });

  test('renders correctly when file is being dragged over', () => {
    render(<DropZone {...mockProps} isDragActive={true} />);
    
    expect(screen.getByText(/Drop your resume file here/i)).toBeInTheDocument();
  });
});