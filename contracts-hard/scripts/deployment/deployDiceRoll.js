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
  const DiceRollFactory = await hre.ethers.getContractFactory("DiceRoll");

  // Deploy the contract
  const DiceRoll = await DiceRollFactory.deploy(num, 1000, 10000000000000000n, 100);

  // Wait for the contract to be deployed
  await DiceRoll.deployed();

  // Print the contract address
  console.log("DiceRoll deployed to:", DiceRoll.address);
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});