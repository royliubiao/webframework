const webpack = require('webpack');
const conf = require('./webpack.conf'); //引用公共配置
const path = require('path');
const _ = require('lodash'); //函数式编程的工具库
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//将css从js文件中提取出来
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');//自己写的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//js压缩
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');//用来拷贝layout
const prodoptions = {
    output: {
        path: path.join(__dirname, '../build/assets'),
        publicPath: '/', //将来上线的地址 cdn/a.js
        filename: 'scripts/[name].[hash:5].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('styles/[name].[hash:5].css'),

        new webpack.optimize.ModuleConcatenationPlugin(),
        // 抽取公用代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',//
            filename: 'scripts/[name].[hash:5].bundle.js',
            minChunks: 2,//最小共用文件数
            // minChunks:Infinity,//抽离webpack公用
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 8,
                mangle: true,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    drop_console: true,//是否打印
                    reduce_vars: true//减少变量
                },
                warnings: false,
                cache: true,
                parallel: os.cpus().length * 2//多线程处理 每个核2个线程
            }
        }),
        new CopyWebpackPlugin([
            { from: 'src/webapp/views/common/layout.html', to: '../views/common/layout.html' },
            { from: 'src/webapp/weigets/top/top.html', to: '../weigets/top/top.html' }
        ]),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: '../views/user/index.html',//路劲和output种定义的path一样
            template: 'src/webapp/views/user/pages/index.html',
            /* 压缩 */
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace:true//删除空格
            },
            inject: false,//是否注入
        }),
        new htmlAfterWebpackPlugin()
    ]
}

const _prodoptions = merge(conf.prod, prodoptions);
console.log(456);
module.exports = _prodoptions;