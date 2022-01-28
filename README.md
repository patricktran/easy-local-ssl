# easy-local-ssl

Automatic self signed SSL generation for local development (MacOS/Windows).  
Powered by [devcert](https://www.npmjs.com/package/devcert).

[![NPM](https://img.shields.io/npm/v/easy-local-ssl.svg)](https://www.npmjs.com/package/easy-local-ssl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<br />

![screenshot](/easy-local-ssl.png?raw=true)

<br />

## Install

```bash
npm install --save easy-local-ssl
```

<br />

## Examples

Check out the examples folder:

- [with-create-react-app](https://github.com/patricktran/easy-local-ssl/tree/main/examples/with-create-react-app)
- [with-react-webpack](https://github.com/patricktran/easy-local-ssl/tree/main/examples/with-react-webpack)

<br />

## Usage

```js
const generateSslCert = require("easy-local-ssl");

// in your webpack config
const ssl = await generateSslCert();

...

// https://webpack.js.org/configuration/dev-server/#devserverhttps
devServerConfig.https = {
    key: ssl.key,
    cert: ssl.cert,
};

```

## Advanced Usage

The generateSslCert method accepts an `options` object.

| Property          | Description                                          | Default value | Type    |
| ----------------- | ---------------------------------------------------- | ------------- | ------- |
| `domain`          | custom domain for the auto generated ssl certificate | "localhost"   | string  |
| `modifyHostsFile` | modifying your /etc/hosts file for custom domains?   | true          | boolean |

<br />

```js

// specify a custom domain
const ssl = await generateSslCert({
    domain: "local.myapp.com",
    modifyHostsFile: true
});
```

## License

MIT © [patricktran](https://github.com/patricktran)
