require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.6.5",
	paths: {
		artifacts: './src/artifacts',
	},
	networks: {
		hardhat: {
			chainId: 1337
		},
		rinkeby: {
			url: "https://rinkeby.infura.io/v3/798afd9ebb964711bad784c5081e32a2",
			accounts: [`0x${React_App_Private_Key}`] //Private key of the account
		}
	}
};
