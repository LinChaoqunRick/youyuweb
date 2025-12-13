const propertiesOrder = require('./properties-order');

module.exports = {
  // customSyntax: 'postcss-html',
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-tailwindcss'],
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.(less|css|html|vue)'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.(scss)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // 缩进
    indentation: null,
    'font-family-name-quotes': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'function-url-quotes': null,
    // css属性排序
    'order/properties-order': propertiesOrder,
    // 忽略rpx单位校验
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'no-descending-specificity': null,
    // webcomponent
    'selector-type-no-unknown': null,
    // 允许空源，太过严格且有部分特殊写法。
    'no-empty-source': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-block-single-line-max-declarations': null,
    'color-function-alias-notation': null,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: 'consecutive-duplicates-with-different-values',
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep', 'local', 'export', 'v-deep', 'v-global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global'],
      },
    ],
    // 允许浏览器前缀属性（兼容 Safari -webkit-user-select 属性）
    'property-no-vendor-prefix': null,
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
    'at-rule-no-unknown': null, // 禁用默认的未知规则检查
    'scss/at-rule-no-unknown': null, // 禁用 SCSS 的未知规则检查
  },
  ignoreFiles: ['node_modules', '**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.mjs', '**/*.json', '**/*.md'],
};
