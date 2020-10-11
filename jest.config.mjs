const config =  {
  moduleFileExtensions: [
    'js',
    'json',
    'mjs'
  ],
  testEnvironment: 'node',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?|mjs?)$",
  transform: {
    "^.+\\.mjs$": "babel-jest"
  },
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"]
};

export default config;
