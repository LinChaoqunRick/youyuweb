module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['import', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: ['./tsconfig.json'], // Specify it only for TypeScript files
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2020,
  },
  rules: {
    ...require('../rules').javascript,
    ...require('../rules').typescript,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '^react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '^react-*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '<THIRD_PARTY_MODULES>',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '^(@youyu)/(.*)',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '^@/(.*)',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '^[./]',
            group: 'sibling',
            position: 'after',
          },
          {
            pattern: '^[./].*\\.less',
            group: 'sibling',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
