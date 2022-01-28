const path = require("path");
const generateSslCert = require("easy-local-ssl");

module.exports =
  async function () {
    const ssl = await generateSslCert();

    return {
      entry: path.resolve(__dirname, "./src/index.js"),
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
        ],
      },
      resolve: {
        extensions: ["*", ".js", ".jsx"],
      },
      output: {
        path: path.resolve(__dirname, "./public"),
        filename: "bundle.js",
      },
      devServer: {
        static: path.resolve(__dirname, "./public"),
        port: 3000,
        https: {
          key: ssl.key,
          cert: ssl.cert,
        },
      },
    };
  };
