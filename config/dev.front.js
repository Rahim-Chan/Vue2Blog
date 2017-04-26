var config = require('./index')

module.exports = function(app){
	require('../build/check-versions')()
	var opn = require('opn')
	var webpack = require('webpack')
	var webpackConfig = require('../build/webpack.dev.conf')

  // default port where dev server listens for incoming traffic
	var port = process.env.PORT || config.dev.port
  // automatically open browser, if not set will be false
	var autoOpenBrowser = !!config.dev.autoOpenBrowser

	var compiler = webpack(webpackConfig)

	var devMiddleware = require('webpack-dev-middleware')(compiler, {
		publicPath: webpackConfig.output.publicPath,
		quiet: true
	})

	var hotMiddleware = require('webpack-hot-middleware')(compiler, {
		log: () => {}
	})
  // force page reload when html-webpack-plugin template changes
	compiler.plugin('compilation', function (compilation) {
		compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
			hotMiddleware.publish({
				action: 'reload'
			})
			cb()
		})
	})

  // serve webpack bundle output
	app.use(devMiddleware)
  // enable hot-reload and state-preserving
  // compilation error display
	app.use(hotMiddleware)

	var uri = 'http://localhost:' + port

	var _resolve
	var readyPromise = new Promise(resolve => {
		_resolve = resolve
	})

	console.log('> Starting dev server...')
	devMiddleware.waitUntilValid(() => {
		console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
		if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
			opn(uri)
		}
		_resolve()
	})
}