import * as path from 'path';

export default (displayName: string, ignorePatterns: string[]) => {
  return {
    passWithNoTests: true,
    rootDir: "..",
    displayName: displayName,
    coveragePathIgnorePatterns: ignorePatterns,
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'build/reports/coverage',
    coverageProvider: 'babel',
    coverageReporters: ['text', 'cobertura', 'lcov'],
    coverageThreshold: {
      global: {
        lines: 80,
      },
    },
    reporters: [
      ['jest-junit', { suiteName: '', outputFile: 'build/reports/tests/junit.xml', includeConsoleOutput: 'true' }],
      'default',
      [
        path.resolve(__dirname, "../node_modules/jest-html-reporter"),
        {
          pageTitle: 'Unit Test Report',
          outputPath: 'build/reports/tests/unit-tests.html',
          includeFailureMsg: true,
        },
      ],
    ],
    transform: { '^.+\\.ts?$': [ "ts-jest", { "useESM": true } ] },
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/**/*.test.[jt]s?(x)'],
    testPathIgnorePatterns: ['node_modules'],
  };
}
