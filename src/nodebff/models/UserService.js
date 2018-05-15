class IndexService {
	constructor(args) {
		// code
	}
	get(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(`hello IOC +【${id}】`);
			}, 1000)
		});
	}
}
export default IndexService;