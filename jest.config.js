/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  logHeapUsage: true,
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', {}],
  },
  moduleFileExtensions: ["js", "json", "ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  coverageReporters: [
    "json-summary",
    "text",
    "lcov"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/dist/",
    "!<rootDir>/src/index.ts",
    "!<rootDir>/src/types/**",
    "!<rootDir>/src/cli/generate-from-url.cli.ts",
    "!<rootDir>/src/tests-related/**",
    "!<rootDir>/src/logic/graphql/**",
    "!<rootDir>/src/specs/**",
    "!<rootDir>/src/api/**",
    "!<rootDir>/src/temp/**"
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist']
};