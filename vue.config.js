module.exports = {
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
};