module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],

  rules: {
    'camelcase': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': [2, 'never']
  }
}
