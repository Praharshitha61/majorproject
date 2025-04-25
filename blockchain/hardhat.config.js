require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: ["21be9ba760114b190bbb90c2e2e4375032da06859f8a197db5b246af54c66967"]
    }
  }
};
