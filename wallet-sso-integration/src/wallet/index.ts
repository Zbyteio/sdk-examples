import { WalletUIConfig } from "@zbyteio/zbyte-common";
import { TORUS_NETWORK_TYPE } from "@zbyteio/zbyte-wallet-sdk-core";
import { WalletAdapter } from "@zbyteio/zbyte-wallet-ui-sdk";

const initParams: WalletUIConfig = {
  baseUrl: process.env.REACT_APP_BASE_URL as string,
  loginParams: {
    accessToken: "",
    tokenExpiry: Number(process.env.REACT_APP_TOKEN_EXPIRY || ""),
    typeOfToken: process.env.REACT_APP_TYPE_OF_TOKEN,
    verifier: process.env.REACT_APP_VERIFIER as string,
    clientId: process.env.REACT_APP_CLIENT_ID as string,
    domain: process.env.REACT_APP_DOMAIN as string,
  },
};

const wallet = new WalletAdapter({
  siteKey: process.env.REACT_APP_CAPTCHA_SITEKEY as string,
  walletUrl: process.env.REACT_APP_WALLET_URL as string,
  web3AuthConfig: {
    networkType: process.env.REACT_APP_AUTH_NETWORK_TYPE as TORUS_NETWORK_TYPE,
    web3AuthClientId: process.env.REACT_APP_AUTH_CLIENT_ID as string,
    enableLogging: (process.env.REACT_APP_ENABLE_LOGGING as string) === "true",
    verifierName: process.env.REACT_APP_VERIFIER as string,
    clientId: process.env.REACT_APP_CLIENT_ID as string,
    domain: process.env.REACT_APP_DOMAIN as string,
  },
});

export const init = async (accessToken?: string) => {
  if (!(accessToken || initParams.loginParams.accessToken)) return;
  console.log("Initialize wallet with", initParams);

  initParams.loginParams.accessToken = accessToken || initParams.loginParams.accessToken;
  wallet.init(initParams);

  if (!wallet.isConnected()) {
    await wallet
      .connect()
      .then((result: any) => {
        console.log("Initialized successfully");
        return result;
      })
      .catch((e: Error) => console.error(e));
  }
};

export default wallet;
