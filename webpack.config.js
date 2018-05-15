const DevWebpack = require('./config/webpack.dev');
const ProdWebpack = require('./config/webpack.prod');
switch (process.env.NODE_ENV) {
    case 'development':
        module.exports = DevWebpack;//开发环境
        break;
    case 'production':
        module.exports = ProdWebpack;//生产环境
        break;
    default:
        module.exports = DevWebpack;//开发环境
}