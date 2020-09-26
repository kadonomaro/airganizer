const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]
  },
  css: {
		loaderOptions: {
			sass: {
					prependData: `
							@import "@/assets/css/variables.scss";
					`
			}
		}
	}
}
