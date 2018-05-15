const webpack = require('webpack');
const fs = require('fs'); //node中读文件夹的插件
const path = require('path');
const _ = require('lodash'); //函数式编程的工具库
const pagesPath = path.join(__dirname, '../src/webapp/views'); //读取所有views中pages的路劲
const ExtractTextPlugin = require('extract-text-webpack-plugin');//将css从js文件中提取出来
const jsEntris = {}; //开发入口文件
const conf = require('./happyWebpack')//happypack 配置文件
//读取路劲  file-文件名 index-索引
fs.readdirSync(pagesPath).map((file, index) => {
    const _fd = pagesPath + '/' + file;
    //系统自动生产的文件 
    if (fs.lstatSync(_fd).isDirectory()) {
        console.log(file);
        fs.readdirSync(_fd).map((sonFile, sonIndex) => {
            if (/.entry.js$/.test(sonFile)) {
                jsEntris[sonFile.replace(".entry.js", "")] = path.join(pagesPath, file, sonFile);
            }
        })
    }
});


//公用modules
const _modules = {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'happypack/loader?id=babel'
    } , {
        test: /\.css$/,
        // use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     use: [
        //         { loader: 'css-loader', options: { importLoaders: 1 } },
        //         'postcss-loader'
        //     ]
        // })
        use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
            use: 'HappyPack/loader?id=css'
            })
    }
]
}

//为环境克隆公用配置_modules
const _devModules = _.cloneDeep(_modules);
const _prodModules = _.cloneDeep(_modules);
//为环境克隆公用配置-_入口配置
const _devEntries = _.cloneDeep(jsEntris);
const _prodEntries = _.cloneDeep(jsEntris);
//为环境克隆公用配置_插件
const _devPlugins = _.cloneDeep(conf.plugins);
const _prodPlugins = _.cloneDeep(conf.plugins);
//公用的依赖
const webpackConfig = {
    // 开发环境 
    dev: {
        entry: _devEntries,
        module: {
            rules: _devModules.rules
        },
        plugins: _devPlugins
        // resolve: {}
    },
    //生产环境 
    prod: {
        entry: _prodEntries,
        module: {
            rules: _prodModules.rules
        },
        plugins: _prodPlugins
        // resolve: {}
    }
};
module.exports = webpackConfig;