// CommonJS format for test-specific Babel configuration
module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' }
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic'
    }]
  ]
};