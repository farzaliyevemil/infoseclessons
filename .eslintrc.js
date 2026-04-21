module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  settings: {
    react: {version: 'detect'},
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', 'security'],
  rules: {
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-unused-vars': ['warn', {argsIgnorePattern: '^_', varsIgnorePattern: '^React$'}],
    'react/prop-types': 'off',
    'security/detect-child-process': 'warn',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
  },
  ignorePatterns: [
    'build/',
    '.docusaurus/',
    'node_modules/',
    'src/generated/',
    'static/',
  ],
};
