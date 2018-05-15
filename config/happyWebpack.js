const HappyPack = require('happypack');
const os  = require('os');
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length });//开启最大线程数
module.exports.plugins = [
    /* es6 */
    new HappyPack({
        id: 'babel',
        threadPool: happyThreadPoll,
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: [["env", { "modules": false }]]
            }
        }]
    }),
    /* css */
    new HappyPack({
        id: 'css',
        threadPool: happyThreadPoll,
        loaders: [{
            loader: 'css-loader',
            options: { importLoaders: 1 },

        }, 'postcss-loader']
    })
];