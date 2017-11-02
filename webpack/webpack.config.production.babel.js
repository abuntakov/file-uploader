import path from 'path'
import webpack from 'webpack' // eslint-disable-line
import merge from 'webpack-merge'
import baseConfig from './webpack.config'

import ExtractTextPlugin from 'extract-text-webpack-plugin' // eslint-disable-line

const rootPath = path.resolve(__dirname, '../')
const srcPath = path.resolve(rootPath, 'src')
const assetsPath = path.resolve(rootPath, '../public/v2')
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
	devtool: 'source-map',

	performance: { hints: 'warning' },

	module: {
		rules: [{
			test:    /\.jsx?$/,
			exclude: /node_modules\/.*/,

			use: [
				{
					loader:  'babel-loader',
					options: babelOptions,
				},
			],
		}, {
			test: /\.scss$/,

			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',

				use: [
					{
						loader:  'css-loader',
						options: {
							minimize: true,
						},
					},
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
			}),
		}],
	},

	output: {
		path:          assetsPath,
		publicPath:    '/assets/v2/',
		filename:      '[name].min.js',
		chunkFilename: '[name].min.js',
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			__DEVELOPMENT__: false,
			__DEVTOOLS__:    false,
			__LOG_LEVEL__:   JSON.stringify('WARN'),

			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new ExtractTextPlugin('[name].css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings:     false,
				drop_console: true,
				unsafe:       true,
			},
		}),
	],
}

export default merge(baseConfig, config)
