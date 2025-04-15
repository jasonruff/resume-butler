// ESM Jest configuration
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
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // Don't transform node_modules except for specific packages if needed
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|react-router))'
  ]
};