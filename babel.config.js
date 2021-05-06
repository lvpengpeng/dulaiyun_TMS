module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    // 开发环境编译变快
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}
