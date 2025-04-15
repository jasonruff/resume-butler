import { validateFile } from './fileValidation.js';
import { 
  validPdfFile, 
  validDocxFile,
  invalidTypeFile,
  oversizedFile,
  emptyFile
} from './testing/mockFiles.js';

describe('File Validation', () => {
  test('accepts valid PDF files', () => {
    expect(validateFile(validPdfFile)).toBeNull();
  });
  
  test('accepts valid DOCX files', () => {
    expect(validateFile(validDocxFile)).toBeNull();
  });
  
  test('rejects files with invalid type', () => {
    expect(validateFile(invalidTypeFile)).toBe('Only PDF and DOCX files are allowed');
  });
  
  test('rejects files exceeding size limit', () => {
    expect(validateFile(oversizedFile)).toBe('File size must be less than 5MB');
  });
  
  test('rejects empty files', () => {
    expect(validateFile(emptyFile)).toBe('File cannot be empty');
  });
  
  test('rejects null or undefined files', () => {
    expect(validateFile(null)).toBe('Please select a file');
    expect(validateFile(undefined)).toBe('Please select a file');
  });
});