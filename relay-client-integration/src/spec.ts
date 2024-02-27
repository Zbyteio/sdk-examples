import { RelayClient, IzbyteWallet, Signer } from "@zbyteio/zbyte-relay-client";
import { MockZbyteWallet } from "./wallet";
import {
  TESTNET_NATIVE_CHAIN_ID,
  MAINNET_NATIVE_CHAIN_ID,
  DEPLOY_CONTRACT_BYTECODE,
  DEPLOY_CONTRACT_ABI,
} from "./constants";

const relayConfig = {
  relayBaseURL: "http://localhost:6001/relay/v1", // url to connect to relay server
  nativeChainId: TESTNET_NATIVE_CHAIN_ID, // MAINNET_NATIVE_CHAIN_ID in case if you want to try operation on mainnet
  pollWait: 5000,
  pollTimeOut: 300000,
};

window.addEventListener("load", () => {
  const invokeButton = document.getElementById("invoke-button");
  const invokeStatus = document.getElementById("invoke-status");
  const invokeResult = document.getElementById("invoke-result");
  const invokeCountEl = document.getElementById("invoke-count");
  const invokeContractHash = document.getElementById(
    "invoke-contract-hash"
  ) as HTMLInputElement;
  const invokeChainId = document.getElementById(
    "invoke-chain-id"
  ) as HTMLInputElement;
  const walletPublicKey = document.getElementById(
    "wallet-public-key"
  ) as HTMLInputElement;
  const walletPrivateKey = document.getElementById(
    "wallet-private-key"
  ) as HTMLInputElement;

  if (
    !invokeButton ||
    !invokeStatus ||
    !invokeResult ||
    !invokeCountEl ||
    !invokeContractHash ||
    !invokeChainId
  ) {
    throw Error("cannot load invoke elements");
  }
  const deployButton = document.getElementById("deploy-button");
  const deployStatus = document.getElementById("deploy-status");
  const deployResult = document.getElementById("deploy-result");
  const deployCountEl = document.getElementById("deploy-count");
  const deployChainId = document.getElementById(
    "deploy-chain-id"
  ) as HTMLInputElement;

  if (
    !deployButton ||
    !deployStatus ||
    !deployResult ||
    !deployCountEl ||
    !deployChainId
  ) {
    throw Error("cannot load deploy elements");
  }

  const transferButton = document.getElementById("transfer-button");
  const transferToAddress = document.getElementById(
    "transfer-to"
  ) as HTMLInputElement;
  const transferAmount = document.getElementById(
    "transfer-amount"
  ) as HTMLInputElement;
  const transferResult = document.getElementById("transfer-result");
  if (
    !transferButton ||
    !transferToAddress ||
    !transferAmount ||
    !transferResult
  ) {
    throw Error("cannot load transfer elements");
  }

  const spenderAddress = document.getElementById(
    "spender-address"
  ) as HTMLInputElement;
  const approveAmount = document.getElementById(
    "approve-amount"
  ) as HTMLInputElement;
  const approveButton = document.getElementById("approve-button");
  const approveResult = document.getElementById("approve-result");

  if (!approveButton || !spenderAddress || !approveAmount || !approveResult) {
    throw Error("cannot load approve elements");
  }

  invokeStatus.innerHTML = "READY";
  deployStatus.innerHTML = "READY";

  let invokeCount = 0;
  invokeCountEl.innerHTML = invokeCount.toString();

  let deployCount = 0;
  deployCountEl.innerHTML = deployCount.toString();

  invokeButton.addEventListener("click", async () => {
    invokeStatus.innerHTML = "PENDING";
    invokeCount++;
    invokeCountEl.innerHTML = invokeCount.toString();
    const signer: IzbyteWallet = new Signer(
      walletPublicKey.value,
      walletPrivateKey.value
    );

    const relayClient = new RelayClient(
      relayConfig,
      new MockZbyteWallet(signer)
    );

    const invokeRes = await relayClient.invokeContract(
      "store", // contract method name to execute
      invokeContractHash.value, // contract hash
      DEPLOY_CONTRACT_ABI, // contract ABI
      [2], // array of arguments to pass to method
      Number(invokeChainId.value)
    );

    console.log("INVOKE RESULT", invokeRes);

    if (invokeRes.workflowError) {
      invokeStatus.innerHTML = "DONE";
      invokeCount--;
      invokeCountEl.innerHTML = invokeCount.toString();
      return;
    }

    invokeStatus.innerHTML = "DONE";
    invokeCount--;
    invokeCountEl.innerHTML = invokeCount.toString();
    invokeResult.innerHTML = "tx hash: " + invokeRes.transactionHash;
  });

  deployButton.addEventListener("click", async () => {
    deployStatus.innerHTML = "PENDING";
    deployCount++;
    deployCountEl.innerHTML = deployCount.toString();
    const signer = new Signer(walletPublicKey.value, walletPrivateKey.value);
    const relayClient = new RelayClient(
      relayConfig,
      new MockZbyteWallet(signer)
    );
    let deployRes: any;
    try {
      deployRes = await relayClient.deployContract(
        DEPLOY_CONTRACT_BYTECODE,
        DEPLOY_CONTRACT_ABI,
        [],
        Number(deployChainId.value)
      );
    } catch (err: any) {
      console.error(err);
    }

    console.log("DEPLOY RESULT: ", deployRes);

    if (deployRes.workflowError) {
      deployStatus.innerHTML = "DONE";
      deployCount--;
      deployCountEl.innerHTML = deployCount.toString();
      return;
    }

    deployStatus.innerHTML = "DONE";
    deployCount--;
    deployCountEl.innerHTML = deployCount.toString();
    deployResult.innerHTML = "contractHash: " + deployRes.contractAddress;
  });

  transferButton?.addEventListener("click", async () => {
    const signer: IzbyteWallet = new Signer(
      walletPublicKey.value,
      walletPrivateKey.value
    );
    const relayClient = new RelayClient(
      relayConfig,
      new MockZbyteWallet(signer)
    );
    let transferRes: any;
    try {
      transferRes = await relayClient.transferDplat(
        relayConfig.nativeChainId, // chainId to be passed to know if operation will happend on testnet or mainnet
        transferToAddress.value,
        transferAmount.value
      );
    } catch (err: any) {
      console.error(err);
    }
    console.log("TRANSFER RESULT: ", transferRes);

    if (transferRes.workflowError) {
      console.log("Error!");
      return;
    }
    transferResult.innerHTML = "transfer worklfow id: " + transferRes;
  });

  approveButton?.addEventListener("click", async () => {
    const signer: IzbyteWallet = new Signer(
      walletPublicKey.value,
      walletPrivateKey.value
    );
    const relayClient = new RelayClient(
      relayConfig,
      new MockZbyteWallet(signer)
    );
    let approveRes: any;
    try {
      approveRes = await relayClient.approveDplat(
        relayConfig.nativeChainId,
        spenderAddress.value,
        approveAmount.value
      );
    } catch (err: any) {
      console.error(err);
    }
    console.log("approve RESULT: ", approveRes);

    if (approveRes.workflowError) {
      console.log("Error!");
      return;
    }

    approveResult.innerHTML = "approve worklfow id: " + approveRes;
  });
});
