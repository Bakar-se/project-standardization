// jest.config.js
module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Correctly map the @ alias to the src directory
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore specific paths
};
