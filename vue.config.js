module.exports = {
  css: {
		modules: true,
		loaderOptions: {
			sass: {
					prependData: `
							@import "@/assets/css/variables.scss";
					`
			}
		}
	}
}
