module.exports = {
  root: true,
  extends: [
    require.resolve('@youyu/spec/src/eslint-config/base'),
    require.resolve('@youyu/spec/src/eslint-config/typescript'), // 2 'react/jsx-one-expression-per-line': 'off'
    require.resolve('@youyu/spec/src/eslint-config/react'), // 3
  ],
};
