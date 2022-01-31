import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ '<rootDir>\\test\\**\\*.test.ts' ],
  moduleNameMapper: {
    "@app/(.*)": '<rootDir>\\src\\'
  }
}

export default config;