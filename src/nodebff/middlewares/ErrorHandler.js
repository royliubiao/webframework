const ErrorHandler = {
	error(app, logger) {
		app.use(async (ctx, next) => {
			try {
				await next()
			} catch (err) {
				logger.error(err);
				ctx.status = err.status || 500;
				ctx.body = 500;
			}
		})
		app.use(async (ctx, next) => {
			await next()
			if (404 != ctx.status) return;
			logger.log(ctx.status);
			ctx.status = 404;
			ctx.body = 404;
		})
	}
}
export default ErrorHandler;