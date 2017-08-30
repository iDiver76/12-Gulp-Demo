var gulp = require('gulp'),
	util = require('gulp-util'),
	webpack = require('webpack'),
	path = require('path');

gulp.task('js', function(cb) {
	webpack({
		entry: './source/main.js',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			]
		},

		// Minifiy in prod mode
		plugins: [].concat(util.env.dev ? [] : [
			new webpack.optimize.UglifyJsPlugin()
		]),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js'
		},
		devtool: util.env.dev ? 'inline-source-map' : false
	}, function(err, stats) {
		if (err) {
			console.log(err);
		}

		util.log(stats.toString({
			colors: util.colors.supportsColor,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: true,
			version: true,
			cached: false,
			cachedAssets: false,
			reasons: false,
			source: false,
			errorDetails: false,
			assetsSort: 'name'
		}));

		cb();
	});
});

gulp.task('default', function() {
	gulp.watch('source/*.js', ['js']);
});
