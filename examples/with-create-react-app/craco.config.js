const generateSslCert = require("easy-local-ssl");

module.exports = async function ({ env }) {
  const ssl = await generateSslCert();

  return {
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
      //use self signed ssl
      devServerConfig.https = {
        key: ssl.key,
        cert: ssl.cert,
      };

      // Return your customized Webpack Development Server config.
      return devServerConfig;
    },
  };
};
