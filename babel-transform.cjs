// This file serves as a wrapper for babel-jest to ensure JSX transformation works correctly
const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  babelrc: false,
  configFile: false
});