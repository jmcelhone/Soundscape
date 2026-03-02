<<<<<<< HEAD
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    testMatch: ['**/test/*.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    extensionsToTreatAsEsm: ['.ts'],
}

export default config;
=======
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    
    "^(\\.{1,2}/.*)\\.ts$": "$1.ts",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  clearMocks: true,
};

export default config;
>>>>>>> post-test
