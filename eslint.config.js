// Flat config (ESLint 9+). Replaces the legacy .eslintrc.js that ESLint 10
// no longer reads. Scope matches the old setup: src/ and scripts/ only —
// root-level configs (docusaurus.config.js, sidebars.js) stay out.
const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const security = require('eslint-plugin-security');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'build/**',
      '.docusaurus/**',
      'node_modules/**',
      'src/generated/**',
      'static/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      // src/ uses ESM imports, scripts/ use require(); module mode parses
      // both because require() and module.exports are plain expressions and
      // their globals come from globals.node (same as the old env: {node}).
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {version: 'detect'},
    },
    plugins: {
      react,
      security,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-unused-vars': [
        'warn',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^React$'},
      ],
      'react/prop-types': 'off',
      'security/detect-child-process': 'warn',
      'security/detect-non-literal-fs-filename': 'off',
      'security/detect-object-injection': 'off',
    },
  },
];
