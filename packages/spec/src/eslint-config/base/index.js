require('./patch');

module.exports = {
  extends: [],
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:prettier/recommended', 'prettier'],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        },
        ecmaVersion: 2020
      },
      rules: {
        ...require('../rules').javascript,
        'prettier/prettier': [
          1,
          {
            ...require('../../prettier-config')
          }
        ]
      }
    }
  ]
};
