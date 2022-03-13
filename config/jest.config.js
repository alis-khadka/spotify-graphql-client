module.exports = {
  rootDir: '../',
  setupFilesAfterEnv: ['./config/jest.setup.js'],
  transform: {
    '\\.js$': ['babel-jest', { configFile: './config/.babelrc' }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  verbose: false,
  collectCoverage: false,
  testEnvironment: 'jsdom'
};
