const { ethers } = require("hardhat");

const main = async () => {
  const networkName = 'goerli'; // specify the network name
  const network = await ethers.provider.getNetwork(networkName);
  console.log("Deploying to network:", networkName, "with chainId:", network.chainId);

  const contractFactory = await ethers.getContractFactory('Carpool')
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
