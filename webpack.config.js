const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPluginNormal = new ExtractTextPlugin('styles.css')

module.exports = {
	context: __dirname,
	entry: {
		bundle: ['./app/app.js']
	},
	output: {
		path: path.join(__dirname,'./public'),
		filename: "./[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(ttf|woff)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}]
			},
			{
				test: /\.(png|gif)$/,
				include: [path.join(__dirname, 'index')],
				use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
			},
			{
				test: /\.svg$/,
				use: 'svg-url-loader',
				include: [
					path.join(__dirname, 'index')
				]
			}
		]
	},
	devtool: 'cheap-module-source-map',
	devServer: {
		inline: true,
		hot: true
	}
}
