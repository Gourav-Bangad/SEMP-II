require("@nomicfoundation/hardhat-toolbox");

// require('dotenv').config({ path: './.env.local' });

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// })

module.exports = {
  solidity: "0.8.17",
};