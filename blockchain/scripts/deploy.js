const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with:", deployer.address);

  const BankAppointment = await ethers.getContractFactory("BankAppointment");
  const contract = await BankAppointment.deploy();

  // 🟢 Correct method for Hardhat + Ethers v6+
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("BankAppointment deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
