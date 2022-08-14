const fs = require("fs");
const path = require("path");
const range_check = require("range_check");

const readFileSync = (file) => fs.readFileSync(file, "utf8");
const ips = module.exports.cloudflareIPs = ["v4.txt", "v6.txt"].map((file) => path.join(__dirname, "data", file)).map(readFileSync).join("\n").split("\n");
const v4ips = module.exports.v4CloudflareIPs = ["v4.txt"].map((file) => path.join(__dirname, "data", file)).map(readFileSync).join("\n").split("\n");
const v6ips = module.exports.v6CloudflareIPs = ["v6.txt"].map((file) => path.join(__dirname, "data", file)).map(readFileSync).join("\n").split("\n");

const isFromCloudflare = module.exports.isFromCloudflare = function(ip) {
	if (range_check.isIP(ip)) {
		const ipVersion = range_check.version(ip);
		if (ipVersion === 4) {
			return range_check.inRange(ip, v4ips);
		} else if (ip_ver === 6) {
			return range_check.inRange(ip, v6ips);
		} else {
			return false;
		}
	} else {
		return false;
	}
};

module.exports.middleware = function(configuration) {
	return function(req, res, next) {
		if (typeof req.headers["cf-connecting-ip"] !== "undefined" && isFromCloudflare(req.ip)) {
			return next();
		} else {
			if (configuration) {
				if (!configuration.error) {
					console.error("`error` property missing from cloudflare-ip-check middleware configuration object. Using default response...");
				} else {
					if (!configuration.error.status) {
						console.error("`error.status` property missing from cloudflare-ip-check middleware configuration object. Using default response...");
					}
					if (!configuration.error.send) {
						console.error("`error.send` property missing from cloudflare-ip-check middleware configuration object. Using default response...");
					}

					if (configuration.error.status && configuration.error.send) {
						return res.status(configuration.status).send(configuration.send);
					}
				}
			}

			return res.status(403).send("Forbidden");
		}
	}
};
