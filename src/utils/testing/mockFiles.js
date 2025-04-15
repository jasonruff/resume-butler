/**
 * Create a mock file for testing
 * @param {string} name - File name
 * @param {string} type - MIME type
 * @param {number} size - File size in bytes
 * @returns {File} - A mock File object
 */
export const createMockFile = (name, type, size) => {
  const file = new File(['mock file content'], name, { type });
  
  // Override the size property
  Object.defineProperty(file, 'size', {
    get() { return size; }
  });
  
  return file;
};

// Common mock files to use in tests
export const validPdfFile = createMockFile('resume.pdf', 'application/pdf', 1024 * 1024); // 1MB
export const validDocxFile = createMockFile('resume.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 1024 * 1024); // 1MB
export const invalidTypeFile = createMockFile('resume.jpg', 'image/jpeg', 1024 * 1024); // 1MB
export const oversizedFile = createMockFile('large-resume.pdf', 'application/pdf', 6 * 1024 * 1024); // 6MB
export const emptyFile = createMockFile('empty.pdf', 'application/pdf', 0); // 0B