const hre = require("hardhat");

async function main() {
  // Get the subscription ID from environment variables
  const subscriptionId = process.env.SUBSCRIPTION_ID;

  // Check if subscription ID is set
  if (!subscriptionId) {
    throw new Error("SUBSCRIPTION_ID environment variable is not set");
  }

  // SUBSCRIPTION_ID="83074301187641066689036193150563878761932957112259461232171101448684658280847"

  const num = 83074301187641066689036193150563878761932957112259461232171101448684658280847n

  // Get the contract factory
  const HiLoFactory = await hre.ethers.getContractFactory("HiLo");

  // Deploy the contract
  const HiLo = await HiLoFactory.deploy("0x549Ebba8036Ab746611B4fFA1423eb0A4Df61440", "0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344");

  // Wait for the contract to be deployed
  await HiLo.deployed();

  // Print the contract address
  console.log("HiLo deployed to:", HiLo.address);
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});