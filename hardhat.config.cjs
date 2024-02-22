require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */

const POLYGON_MUMBAI_RPC = 'https://rpc.ankr.com/polygon_mumbai';

ETHERSCAN_API_KEY = 'from any rpc';
module.exports = {
  solidity: '0.8.10',
  networks: {
    hardhat: {
      chainId: 31337,
    },

    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [``],
    },
  },
  etherscan: {
    apiKey: 'JPBHNWRTYB9JXFYCEC296FC5E9NRR2E9II',
  },
};
