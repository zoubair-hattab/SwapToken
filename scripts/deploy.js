import hre from 'hardhat';
const customDex = await ethers.deployContract('CustomDex');

await customDex.waitForDeployment();

console.log(` deployed to ${customDex.target}`);
