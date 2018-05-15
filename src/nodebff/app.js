 import koa from "koa";
 import router from "koa-simple-router"; //路由
 import render from "koa-swig"; //渲染
 import co from "co"; //兼容koa-swig
 import serve from "koa-static"; //静态资源
 import log4js from 'log4js'; //错误日志记录
 import {
 	createContainer,
 	asClass,
 	Lifetime,
 	asValue
 } from 'awilix'; //ico
 import {
 	scopePerRequest,
 	loadControllers
 } from 'awilix-koa';


 import config from "./config/main.js"; //环境地址
 // import InitControll from './controllers/InitController.js'; //路由控制
 import ErrorHandler from './middlewares/ErrorHandler.js'; //路由控制
 // import TestService from './models/TestService.js'; //testService


 //创建一个app
 const app = new koa();
 //灵魂 IOC注入
 const container = createContainer();
 // 先把所有的service注册到容器中去 
 container.loadModules(['models/*.js'], {
 	//对service的类名进行转换 testService:TestService.js
 	formatName: 'camelCase',
 	//生命周期 
 	resolverOptions: {
 		//用scope给用户进行models的缓存
 		lifetime: Lifetime.SCOPED
 	}
 })
 //将service中心注册到controller中去 动态分析用哪个service就传哪个
 app.use(scopePerRequest(container));
 //贯穿值 用于做路有守护
 app.use((ctx, next) => {
 	ctx.state.container.register({
 		user: asValue(ctx.state.user)
 	});
 	return next();
 })

 //引用koa-swig模板
 app.context.render = co.wrap(render({
 	root: config.viewdir, //路劲
 	autoescape: true,
 	cache: 'memory',
 	ext: 'html',
 	writeBody: false,
 	varControls: ['[[', ']]'] //配合vue使用时定义数据绑定的{}
 }));

 //错误日志记录
 log4js.configure({
 	appenders: {
 		roylog: {
 			type: 'file',
 			filename: './logs/roylog.log'
 		}
 	},
 	categories: {
 		default: {
 			appenders: ['roylog'],
 			level: 'error'
 		}
 	}
 });
 const logger = log4js.getLogger('roylog');
 ErrorHandler.error(app, logger);
 //引用静态资源
 app.use(serve(config.staticdir));

 //初始化所有路由🍺 保证上下文顺利的传输
 app.use(loadControllers('controllers/*.js', {
 	cwd: __dirname
 }))

 //启动服务器
 app.listen(config.port, () => {
 	console.log('Server is Starting 🍺');
 })


 // 前端架构师启蒙课【终】 (1)   1:06:  24