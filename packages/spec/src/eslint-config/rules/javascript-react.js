module.exports = {
  'jsx-a11y/accessible-emoji': 0,
  'jsx-a11y/click-events-have-key-events': 0,
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/anchor-is-valid': 0,
  // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
  'react/jsx-filename-extension': [
    2,
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'react/prefer-stateless-function': 0,
  'react/destructuring-assignment': 0,
  'react/prop-types': 0,
  'react/react-in-jsx-scope': 0,
  'react/require-default-props': 0,
  'react/jsx-props-no-spreading': 0,
  'react/static-property-placement': 0,
  'react/no-unescaped-entities': 0,
  // Hook 依赖校验
  'react-hooks/exhaustive-deps': 1,
  'react/jsx-one-expression-per-line': 'off',
};
