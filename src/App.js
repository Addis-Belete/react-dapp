

import { useState } from 'react';
import { ethers } from 'ethers';

import Token from './artifacts/contracts/Token.sol/Token.json'

const tokenAddress = "0x07E85EA990d273eA5d18192a403Be08fd13FAA38"
function App() {



	const [amount, setAmount] = useState(0);
	const [userAccount, setUserAccount] = useState('')
	const [balance, setBalance] = useState('0')
	// request access to users MetaMask account
	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
	}

	//call the smart contract, read the current reading value


	// the smart contract, send an update


	async function fetchTransfer() {
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

			const transation = await contract.transfer(userAccount, amount);
			try {
				await transation.wait();
				console.log(`${amount} Coins successfully sent to ${userAccount}`);
			} catch (err) {
				console.log("Error: ", err)
			}
		}
	}
	//getBalance function

	async function getBalance() {
		if (typeof window.ethereum !== 'undefined') {
			const [account] = await window.ethereum.request({ method: "eth_requestAccounts" })
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
			try {
				const balance = await contract.balanceOf(account);

				console.log("Balance: ", balance.toString());
				setBalance(balance.toString())

			}
			catch (err) {
				console.log("Error: ", err)
			}

		}
	}
	return (
		<div className="App" style={{ display: "flex", justifyContent: "space-evenly" }}>

			<div style={{ marginTop: 30 }}>
				<h1>My First Full-Stack Dapp</h1>
				<label style={{ marginRight: "10px" }} htmlFor="address" >Address</label>
				<input type="text" id="address" onChange={((e) => { setUserAccount(e.target.value) })} value={userAccount} placeholder='Enter Address' style={{ width: 200, padding: 5, marginBottom: 20 }} />
				<br />
				<label htmlFor="amount" style={{ marginRight: "10px" }} >Amount</label>
				<input type="number" id="amount" onChange={((e) => setAmount(e.target.value))} value={amount} placeholder='Enter Amount' style={{ width: 200, padding: 5, marginBottom: 20 }} />
				<br />
				<button onClick={fetchTransfer} style={{ padding: "5px 10px", marginBottom: 20 }}>Transfer</button><br />
				<button onClick={getBalance} style={{ padding: "5px 10px" }}>Get Balance</button>
				<span style={{ marginLeft: 35 }}>{`Your Balance is:-   ${balance}`}</span>
			</div>
		</div>
	);
}

export default App;
