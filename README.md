# cloudflare-ip-check

## Summary

This npm package is used to check if a certain IP came from Cloudflare. The list of Cloudflare IPs is updated every day.

## Install

```
npm install https://github.com/rrainn/cloudflare-ip-check.git
```

## Usage

```js
const cloudflareIPCheck = require("cloudflare-ip-check");
```

### cloudflareIPs

Array of strings representing every Cloudflare IP range.

```js
console.log(cloudflareIPCheck.cloudflareIPs);
```

### v4cloudflareIPs

Array of strings representing every v4 Cloudflare IP range.

```js
console.log(cloudflareIPCheck.v4cloudflareIPs);
```

### v6cloudflareIPs

Array of strings representing every v6 Cloudflare IP range.

```js
console.log(cloudflareIPCheck.v6cloudflareIPs);
```

### isFromCloudflare(ip)

Check if an IP is from Cloudflare, returns a boolean representing if an IP is from Cloudflare.

```js
console.log(cloudflareIPCheck.isFromCloudflare("0.0.0.0")); // false
console.log(cloudflareIPCheck.isFromCloudflare("173.245.48.2")); // true
```

### middleware([configuration])

This is an Express.js middleware function that can be used to check if an IP is from Cloudflare.

```js
app.use(cloudflareIPCheck.middleware());
```

You can optionally pass in an object representing the configuration of the middleware.

```js
app.use(cloudflareIPCheck.middleware({
	"error": {
		"status": 403,
		"send": "Forbidden"
	}
}));
```

If no configuration is passed in, it will return 403 "Forbidden" if the IP is not from Cloudflare.
