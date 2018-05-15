import _ from "lodash";
import local from "./local";
import path from "path";

const server = {
	"port": 80
}
let config = {
	"viewdir": path.join(__dirname, '..', 'views'),
	"staticdir": path.join(__dirname, '..', 'assets'),
	"env": process.env.NODE_ENV
}

if (config.env == "production") {
	config = _.extend(config, server); //如果是生产环境就配置80端口 ***扩展config
} else {
	config = _.extend(config, local)
}
export default config;