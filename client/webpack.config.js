let path = require('path');

let = conf = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/public/build/',
		publicPath: "build/",
		filename: "bundle.js"
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: [/node_modules/, /public/]
			}
		]
	}
};

module.exports = conf;