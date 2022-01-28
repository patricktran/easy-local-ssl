import fs from "fs";
import path from "path";
import os from "os";
import prompts from "prompts";

const getWindowsEncryptionPassword = async (): Promise<string> => {
  console.info(
    `A password is required to access the secure certificate authority key
    used for signing certificates.\n
    If this is the first time this has run, then this is to set the password
    for future use.  If any new certificates are signed later, you will need
    to use this same password.`
  );

  const results = await prompts({
    type: `password`,
    name: `value`,
    message: `Please enter the CA password`,
    validate: input => input.length > 0 || `You must enter a password.`
  });
  
  return results.value;
};

export interface GenerateSslCertOptions {
  /** domain for the SSL */
  domain?: string,
  /** add entry to /etc/hosts file for custom domains? */
  modifyHostsFile?: boolean
}

export interface CertResponse {
  key: Buffer,
  cert: Buffer
}

/**
 * Generate a self signed SSL for local development
 * @param {object} GenerateSslCertOptions 
 */
const generateSslCert = async ({
  domain = "localhost",
  modifyHostsFile = true} : GenerateSslCertOptions = {}
) : Promise<CertResponse | Error> => {
  try {
    console.info(
      `\nSetting up automatic SSL certificate (may require elevated permissions/sudo)\n`
    );

    if ([`linux`, `darwin`].includes(os.platform()) && !process.env.HOME) {
      // this is a total hack to ensure process.env.HOME is set on linux and mac
      const mkdtemp = fs.mkdtempSync(path.join(os.tmpdir(), `home-`));
      process.env.HOME = mkdtemp;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const getDevCert = require(`devcert`).certificateFor;

    const { caPath, key, cert } = await getDevCert(domain, {
      getCaPath: true,
      skipCertutilInstall: false,
      skipHostsFile: !modifyHostsFile,
      ui: {
        getWindowsEncryptionPassword
      }
    });

    if (caPath) {
      process.env.NODE_EXTRA_CA_CERTS = caPath;
    }

    return {
      key,
      cert
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`\nFailed to generate dev SSL certificate - ${err.message}`);
      
    throw err;
  }
};

module.exports = generateSslCert;