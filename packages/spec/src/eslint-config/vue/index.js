module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    // 'plugin:prettier/recommended' // ✅ 官方推荐用法，兼容 Prettier v3
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  rules: {
    // 可自定义规则
    '@typescript-eslint/no-unused-vars': ['warn'],
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3, // 允许单行最多 3 个属性
        multiline: 1,
      },
    ],
  },
};
