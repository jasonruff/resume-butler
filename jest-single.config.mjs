// ESM Jest configuration for a single test file
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.mjs'],
  extensionsToTreatAsEsm: ['.jsx'],
  
  // Transform JSX files using our custom transformer
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/babel-transform.cjs'
  },
  
  moduleNameMapper: {
    // Handle CSS/SCSS imports in tests
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Mock problematic modules
    '^pdfjs-dist(.*)$': '<rootDir>/__mocks__/pdfjs-dist.js'
  },
  
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // Mock everything not specifically required
  transformIgnorePatterns: []
};