const royRouter = () => {
	return (target, property, descriptor) => {
		console.log('路由守护', property);
		const result = "ok";
		if (result == "ok") { //假设用户名正确密码正确 就跳转正确页面
			return property();
		} else {
			target.redirect('http://www.baidu.com');
		}
	}
}
export default royRouter;