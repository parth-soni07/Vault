import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    goat: {
      url: "https://rpc.testnet3.goat.network",
      chainId: 48816,
      accounts: process.env.METAMASK_PRIVATE_KEY
        ? [process.env.METAMASK_PRIVATE_KEY]
        : [],
    },
    sonicBlazeTestnet: {
      url: "https://rpc.blaze.soniclabs.com",
      chainId: 57054,
      accounts: process.env.METAMASK_PRIVATE_KEY
        ? [process.env.METAMASK_PRIVATE_KEY]
        : [],
    },
  },
  settings: {
    evmVersion: "cancun",
  },
};
