const path = require('path');
const tsconfigPath = path.resolve(__dirname, './tsconfig.esm.json');

module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    '@blb-ventures/eslint-config',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks', 'jsx-a11y'],
  ignorePatterns: ['node_modules', 'lib', 'src/playground.ts', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: tsconfigPath,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
