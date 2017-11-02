import path from 'path'
import webpack from 'webpack' // eslint-disable-line
import merge from 'webpack-merge' //eslint-disable-line
import baseConfig from './webpack.config'

const rootPath = path.resolve(__dirname, '../')
const srcPath = path.resolve(rootPath, 'src')
const assetsPath = path.resolve(rootPath, 'build')
const mainModulesPath = path.resolve(rootPath, 'node_modules')

const babelOptions = {
	presets: [
		'react',
		['es2015', { loose: true, modules: false }],
		'stage-0',
	],
	plugins: [
		['transform-runtime'],
		['add-module-exports'],
	],
}

const config = {
	devtool: 'cheap-module-eval-source-map',

	performance: { hints: false },

	entry: {
		index: [
			'react-hot-loader/patch',
			baseConfig.entry.index,
		],
	},

	module: {
		rules: [{
			test:    /\.jsx?$/,
			exclude: /node_modules\/.*/,

			use: [
				{
					loader: 'react-hot-loader/webpack',
				},
				{
					loader:  'babel-loader',
					options: babelOptions,
				},
			],
		}, {
			test: /\.scss$/,

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

				{
					loader:  'sass-loader',
					options: {
						sourceMap:    true,
						includePaths: [
							srcPath,
							mainModulesPath,
						],
					},
				},
			],
		}],
	},

	output: {
		filename:      '[name].js',
		chunkFilename: '[name].js',
	},

	devServer: {
		contentBase: assetsPath,
		port:        3001,
		hot:         true,

		disableHostCheck: true,

		watchOptions: {
			aggregateTimeout: 300,
			poll:             1000,
		},

		proxy: {
			'/api/**': {
				target: 'http://localhost:3000',
			},

			'/': {
				target: 'http://localhost:3000',
			},
		},
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			__DEVELOPMENT__: true,
			__DEVTOOLS__:    true,
			__LOG_LEVEL__:   JSON.stringify('DEBUG'),

			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
}


export default merge(baseConfig, config)
