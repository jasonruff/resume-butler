/**
 * Validates a file to ensure it meets the requirements for resume upload
 * 
 * @param {File} file - The file to validate
 * @returns {string|null} - Error message if validation fails, null if validation passes
 */
export const validateFile = (file) => {
  // Check if file exists
  if (!file) {
    return 'Please select a file';
  }
  
  // Check file size
  if (file.size === 0) {
    return 'File cannot be empty';
  }
  
  // Max file size: 5MB
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return 'File size must be less than 5MB';
  }
  
  // Check file type
  const allowedTypes = [
    'application/pdf', // PDF
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return 'Only PDF and DOCX files are allowed';
  }
  
  // All validations passed
  return null;
};