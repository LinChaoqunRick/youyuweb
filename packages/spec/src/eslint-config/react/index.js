require('./patch');

module.exports = {
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      extends: ['airbnb', 'airbnb/hooks'],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        ecmaVersion: 2020,
      },
      rules: {
        ...require('../rules').javascriptReact,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb', 'airbnb-base', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        ecmaVersion: 2020,
      },
      rules: {
        ...require('../rules').javascriptReact,

        // Support ts-ignore comment
        '@typescript-eslint/ban-ts-comment': 0,

        'import/no-unresolved': 0,
        'import/no-absolute-path': 0,
      },
      settings: {
        react: {
          version: '17.0.2',
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
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
