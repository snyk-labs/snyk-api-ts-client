module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['lib/**/*.ts', 'utils/**/*.ts'],
  coverageReporters: ['text-summary', 'html'],
};
