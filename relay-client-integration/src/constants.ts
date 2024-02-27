export const TESTNET_NATIVE_CHAIN_ID = 80001;
export const MAINNET_NATIVE_CHAIN_ID = 137;

/* load test constants end */

export const DEPLOY_CONTRACT_BYTECODE =
  "608060405234801561001057600080fd5b5061002161001c610026565b610060565b6100b4565b6001546000906001600160a01b0316331415610049575060131936013560601c90565b61005b6100b060201b6101cb1760201c565b905090565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b3390565b6103c7806100c36000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063715018a61161005b578063715018a6146100df5780638da5cb5b146100e7578063da74222814610102578063f2fde38b1461011557600080fd5b80632e64cec114610082578063572b6c05146100985780636057361d146100ca575b600080fd5b6002546040519081526020015b60405180910390f35b6100ba6100a6366004610348565b6001546001600160a01b0391821691161490565b604051901515815260200161008f565b6100dd6100d8366004610378565b600255565b005b6100dd610128565b6000546040516001600160a01b03909116815260200161008f565b6100dd610110366004610348565b61013c565b6100dd610123366004610348565b610150565b6101306101cf565b61013a6000610248565b565b6101446101cf565b61014d81610298565b50565b6101586101cf565b6001600160a01b0381166101c25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61014d81610248565b3390565b6101d7610320565b6001600160a01b03166101f26000546001600160a01b031690565b6001600160a01b03161461013a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101b9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381166102bf5760405163d92e233d60e01b815260040160405180910390fd5b600180546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527f94aed472e01353526c04ec91cee149d41e78d848ec851c72be532bf7b120bd30910160405180910390a15050565b6001546000906001600160a01b0316331415610343575060131936013560601c90565b503390565b60006020828403121561035a57600080fd5b81356001600160a01b038116811461037157600080fd5b9392505050565b60006020828403121561038a57600080fd5b503591905056fea26469706673582212208fcaaed8728479d2f3ec63fcc26fe7f2f937b061c2c05665b8294156f580eb9464736f6c63430008090033";

export const DEPLOY_CONTRACT_ABI = [
  {
    inputs: [],
    name: "CannotSendEther",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroValue",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ForwarderSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder_",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder_",
        type: "address",
      },
    ],
    name: "setTrustedForwarder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
