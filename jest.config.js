export default {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The root directory that Jest should scan for tests and modules within
  rootDir: '.',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/app/javascript'],

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.(js|jsx)',
    '**/*.(test|spec).(js|jsx)'
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'json'],

  // A map from regular expressions to module names or to arrays of module names
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Setup files to run before each test file
  setupFilesAfterEnv: ['<rootDir>/app/javascript/__tests__/setup.js'],

  // Transform files with Babel
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Ignore transforming some modules
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'app/javascript/**/*.(js|jsx)',
    '!app/javascript/__tests__/**/*',
    '!app/javascript/**/*.test.{js,jsx}',
    '!app/javascript/**/*.spec.{js,jsx}',
  ],

  // Mock CSS imports
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/app/javascript/__tests__/__mocks__/fileMock.js',
  },

  // Clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};