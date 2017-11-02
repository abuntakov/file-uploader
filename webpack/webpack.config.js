import path from 'path'
import webpack from 'webpack'

const rootPath = path.resolve(__dirname, '../')
const srcPath = path.resolve(rootPath, 'app')
const assetsPath = path.resolve(rootPath, 'build')
const mainModulesPath = path.resolve(rootPath, 'node_modules')

const config = {
	context: srcPath,

	entry: {
		index: './index',
	},

	output: {
		publicPath: '/assets/',
		path:       assetsPath,
	},

	resolve: {
		modules:    [mainModulesPath],
		extensions: ['.js', '.jsx'],

		alias: {
			app: path.resolve(rootPath, 'src'),
		},
	},

	module: {
		rules: [{
			test: /\.css$/,

			use: [
				'style-loader',
				'css-loader',

				{
					loader:  'postcss-loader',
					options: {
						sourceMap: true,

						config: {
							path: 'webpack/postcss.config.js',
						},
					},
				},

				'resolve-url-loader',
			],
		}, {
			test:   /\.(woff2?|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000',
		}, {
			test:   /\.svg/,
			loader: 'svg-url-loader',
		}, {
			test:   /\.(eot)(\?[\s\S]+)?$/,
			loader: 'file-loader',
		}, {
			test:   /\.(jpe?g|png|gif)(\?[\s\S]+)?$/,
			loader: 'file-loader?name=[hash]-[name].[ext]',
		}],
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',

			minChunks: module => (
				module.context &&
				module.context.indexOf('node_modules') !== -1 &&
				!module.context.endsWith('css')
			),
		}),
	],
}

export default config
