import {
  NetworkConfig,
  OperationSign,
  UnsignedBatchTx,
  UnsignedTxn,
  IWalletUI,
  WalletUIConfig,
} from "@zbyteio/zbyte-common";
import { IzbyteWallet } from "@zbyteio/zbyte-relay-client";

export class MockZbyteWallet implements IWalletUI {
  private wallet: IzbyteWallet;
  constructor(wallet: IzbyteWallet) {
    this.wallet = wallet;
  }
  isConnected(): boolean {
    throw new Error("Method not implemented.");
  }
  listTransaction(address: string): any[] {
    throw new Error("Method not implemented.");
  }
  init(config: WalletUIConfig): void {
    throw new Error("Method not implemented.");
  }
  open(): void {
    throw new Error("Method not implemented.");
  }
  getNetwork(): NetworkConfig {
    const networkInfo: NetworkConfig = {
      networkName: "",
      networkRpcUrl: "",
      iconPath: "",
      chainId: 0,
      chainSymbol: "",
      explorer: "",
      networkType: "",
    };
    return networkInfo;
  }
  async getAddress(): Promise<string> {
    return await this.wallet.getAddress();
  }
  connect(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async batchSignTypedData(
    txnBatch: UnsignedBatchTx
  ): Promise<OperationSign[]> {
    // add signing code
    //alert('singing transaction:' + JSON.stringify(txnBatch));
    const result: Array<OperationSign> = [];
    for (const txn of txnBatch.transactions) {
      const signedTxn = await this.wallet.signTypedData(
        JSON.stringify(txn.data),
        43113
      );
      console.log(txn.metadata.subOperation!, signedTxn);
      result.push({
        operationName: txn.metadata.subOperation!,
        signature: signedTxn,
      });
    }
    return result;
  }
}
