const webpack = require("webpack");

module.exports = {
  configureWebpack: {
		//支持jquery
		plugins: [
			new webpack.ProvidePlugin({
				$:"jquery",
				jQuery:"jquery",
				"windows.jQuery":"jquery"
			})
		]
	},
  devServer: {
    port: 8081,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api-svg': {
        target: `https://test-1258689388.cos.ap-shanghai.myqcloud.com`,
        changeOrigin: true,
        pathRewrite: {
          '^/api-svg': '/'
        }
      }
    },
    // after: require('./mock/mock-server.js')
  },
  transpileDependencies: ['vuetify'],
}
