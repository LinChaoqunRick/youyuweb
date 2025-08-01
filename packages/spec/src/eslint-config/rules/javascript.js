// prettier-ignore
module.exports = {
  'lines-between-class-members': [
    // 要求或禁止在类成员之间出现空行
    2,
    'always',
    {
      exceptAfterSingleLine: true // 跳过对单行类成员之后的空行的检查
    }
  ],
  'prefer-destructuring': [
    2,
    {
      array: false,
      object: true
    }
  ],
  'no-unused-vars': [1, { argsIgnorePattern: '^_' }],
  'no-useless-constructor': 1,
  'global-require': 0,
  'max-classes-per-file': 0,
  'class-methods-use-this': 0,
  'no-void': 0,
  'no-plusplus': 0,
  'no-nested-ternary': 0, // 禁止使用嵌套的三元表达式
  'no-restricted-globals': 0, // 禁用特定的全局变量
  'no-use-before-define': 0, // 禁止定义前使用
  'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线
  'no-unused-expressions': 0, // 禁止未使用过的表达式
  'no-empty': 1,
  'no-empty-function': [1, { allow: ['arrowFunctions'] }],
  'no-shadow': 0, // 禁止局部变量与全局变量同名
  'no-continue': 0, // 循环中 continue 语句
  'no-param-reassign': 0, // 禁止变量重新赋值
  'consistent-return': 0, // 函数中，前后一致的返回值
  'radix': [1, 'as-needed'],
  'import/prefer-default-export': 0, // When there is only a single export from a module, prefer using default export over named export.
  'import/extensions': 0, // Ensure consistent use of file extension within the import path
  'import/no-extraneous-dependencies': 0, // Forbid the use of extraneous packages
  'import/no-named-as-default-member': 0,
  'no-restricted-syntax': 0,
  'no-labels': 0,
  'camelcase': 'off',
  'arrow-parens': ['error', 'as-needed'],
  "arrow-body-style": "off",
  'max-len': ['error', { code: 120 }]
};
