const webpack = require('webpack');
const conf = require('./webpack.conf'); //引用公共配置
const path = require('path');
const _ = require('lodash'); //函数式编程的工具库
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//将css从js文件中提取出来
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');//自己写的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');//用来拷贝layout

const devoptions = {
	output: {
		path: path.join(__dirname, '../build/assets'),
		publicPath: '/', //将来上线的地址 cdn/a.js
		filename: 'scripts/[name].bundle.js'
	},
	plugins: [
		new ExtractTextPlugin('styles/[name].css'),
		// 抽取公用代码
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vender',//
			filename: 'scripts/[name].bundle.js',
			minChunks: 2,//最小共用文件数
			// minChunks:Infinity,//抽离webpack公用
		}),
		new CopyWebpackPlugin([
			{ from: 'src/webapp/views/common/layout.html', to:'../views/common/layout.html'},
			{ from: 'src/webapp/weigets/top/top.html', to:'../weigets/top/top.html'}
		]),
		new HtmlWebpackPlugin({  // Also generate a test.html
			filename: '../views/user/index.html',//路劲和output种定义的path一样
			template: 'src/webapp/views/user/pages/index.html',
			inject:false//是否注入
		}),
		new htmlAfterWebpackPlugin()
	]
}

const _devoptions = merge(conf.dev, devoptions);
console.log(123);
module.exports = _devoptions;