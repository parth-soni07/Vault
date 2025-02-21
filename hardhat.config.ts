import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  solidity: "0.8.24",
  networks: {
    goat: {
      url: "https://rpc.testnet3.goat.network",
      chainId: 48816,
    },
  },
  settings: {
    evmVersion: "cancun",
  },
};

