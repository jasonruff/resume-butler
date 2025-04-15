import { render, screen } from '@testing-library/react';
import UploadProgress from './UploadProgress';

describe('UploadProgress Component', () => {
  test('renders correct progress percentage', () => {
    const progress = 45;
    render(<UploadProgress progress={progress} />);
    
    expect(screen.getByText(`Uploading... ${progress}%`)).toBeInTheDocument();
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', progress.toString());
    expect(progressBar).toHaveStyle(`width: ${progress}%`);
  });
  
  test('renders 100% complete progress', () => {
    render(<UploadProgress progress={100} />);
    
    expect(screen.getByText('Uploading... 100%')).toBeInTheDocument();
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    expect(progressBar).toHaveStyle('width: 100%');
  });
});