import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config()

const config: HardhatUserConfig = {
  solidity: "0.8.28",
};

module.exports = {
  solidity: {
      compilers: [
          {
              version: "0.8.28",
              settings: {
                  optimizer: {
                      enabled: true,
                      runs: 400,
                      details: {yul: false},
                  }
              }
          }
      ]
  },
  defaultNetwork: 'sepolia',
  paths: {
    sources: './contracts',
  },
  
  networks: {
      "sepolia": {
          url: process.env.PROVIDER || "",
          accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      }
      }
};


