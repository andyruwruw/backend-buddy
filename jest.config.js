/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/utils/setup-test-env.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
};
