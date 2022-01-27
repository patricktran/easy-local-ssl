# easy-local-ssl
Automatic self signed SSL generation for local development.  
Powered by [devcert](https://www.npmjs.com/package/devcert).  

[![NPM](https://img.shields.io/npm/v/easy-local-ssl.svg)](https://www.npmjs.com/package/easy-local-ssl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<br />

![screenshot](/easy-local-ssl.png?raw=true)

<br />

## Install  

```bash
npm install --save easy-local-ssl
```

## Examples

## Usage

```js
const generateSslCert = require("easy-local-ssl");

const ssl = await generateSslCert();

// https://webpack.js.org/configuration/dev-server/#devserverhttps
devServerConfig.https = {
    key: ssl.key,
    cert: ssl.cert,
};

```


