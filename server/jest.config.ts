import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    testMatch: ['**/test/*.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    extensionsToTreatAsEsm: ['.ts'],
}

export default config;
