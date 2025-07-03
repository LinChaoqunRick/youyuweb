require('./patch');

module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
        ecmaVersion: 2020,
      },
      rules: {
        ...require('../rules').javascript,
        'prettier/prettier': [
          1,
          {
            ...require('../../prettier-config'),
          },
        ],
      },
    },
  ],
};
