module.exports = {
  root: true,
  plugins: ['import', 'vue'],
  extends: ['plugin:vue/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  rules: {
    ...require('../rules').javascript,
    ...require('../rules').typescript,
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
    // 导入顺序规则
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc', // 按字母排序
          caseInsensitive: true,
        },
        'newlines-between': 'always', // 每组之间空一行
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.vue'],
      },
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },
};
