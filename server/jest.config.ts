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