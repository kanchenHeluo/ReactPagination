var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
	entry: './Main.jsx',
	output:{
		path:'/',
		filename:'index.js'
	},
	devServer:{
		inline:true,
		port:8888
	},
	devtool: 'source-map',
	module: {		
		rules:[		
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use:[
					'eslint-loader',
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:{
					presets:['es2015', 'react', 'stage-0']
				}
			},
			{
				test: /\.css?$/,
				loader: 'style-loader!css-loader?modules'
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			title: 'use plugin',
			filename:'index.html',
			hash:true
		})
		/*
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    })
		*/
	],
	resolve:{
		extensions:['.js','.jsx']
	}
};

module.exports = config;