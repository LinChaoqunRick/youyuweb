const path = require('path');

require('./patch');

module.exports = {
  extends: [path.join(__dirname, '../base/index.js')],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
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
        'prettier/prettier': [
          2,
          {
            ...require('../../prettier-config'),
          },
        ],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
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
                pattern: '^(@iot|@yeastar)/(.*)',
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
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          // use <root>/tsconfig.json
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<root>/@types` directory even it doesn't contain any source code, like `@types/unist`
          },
        },
      },
    },
  ],
};
