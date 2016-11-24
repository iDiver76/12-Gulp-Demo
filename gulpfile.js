var gulp = require('gulp'),
	sass = require('gulp-sass'),
	util = require('gulp-util'),
	webpack = require('webpack');

gulp.task('js', function(cb) {
	webpack({
		entry: './source/main.js',
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015']
					}
				},
				{
					test: require.resolve('jquery'),
					loader: 'expose?jQuery!expose?$'
				}
			]
		},

		// Minifiy in prod mode
		plugins: [].concat(util.env.dev ? [] : [
			new webpack.optimize.UglifyJsPlugin()
		]),
		output: {
			path: 'build',
			filename: '[name].js'
		},
		devtool: util.env.dev ? 'inline-source-map' : null
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

gulp.task('css', function() {
	return gulp.src('source/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/'));
});

gulp.task('default', function() {
	gulp.watch('source/*.js', ['js']);
	gulp.watch('source/*.scss', ['css']);
});
