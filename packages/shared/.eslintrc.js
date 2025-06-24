module.exports = {
  root: true,
  extends: [
    require.resolve('@youyu/spec/src/eslint-config/base'),
    require.resolve('@youyu/spec/src/eslint-config/typescript'),
    require.resolve('@youyu/spec/src/eslint-config/vue'),
    require.resolve('@youyu/spec/src/eslint-config/react'),
  ],
};
