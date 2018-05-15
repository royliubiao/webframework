import {
	route,
	GET,
	POST,
	before
} from 'awilix-koa'; // or `awilix-router-core`
import royRouter from '../middlewares/royRouter';
@route('/users')
export default class UserAPI {
	constructor({
		userService,
		user
	}) {
		this.userService = userService;
		this.user = user
	}
	//node 还不支持装饰器 需要安装插件 babel-plugin-transform-decorators-legacy
	//装饰器在方法执行前 先把类注入进来
	//users/:id users/4 -》 到下面的这段async函数里
	//拿回来一个promis的api
	//use的方式去load的controllers
	@route('/:id')
	@GET()
	@before([royRouter()]) //开启路由守护 引入守护方法
	async getUser(ctx, next) {
		console.log('获取到贯穿的值是', this.user);
		const result = await this.userService.get(ctx.params.id)
		ctx.body = await ctx.render('user/index', {
			data: result
		});
	}
}