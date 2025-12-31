require('./patch');

module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  overrides: [
    {
      files: ['*.js'],
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
