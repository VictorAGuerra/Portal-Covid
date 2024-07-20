export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.(css|scss|sass)$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  testMatch: ['<rootDir>/tests/**/*.(spec|test).(js|jsx|mjs)'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
};
