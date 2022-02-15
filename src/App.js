
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
function App() {

	const [greeting, setGreetingValue] = useState()
	// request access to users MetaMask account
	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
	}

	//call the smart contract, read the current reading value

	async function fetchGreeting() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
			try {
				const data = await contract.great()
				console.log('data: ', data)
			} catch (err) {
				console.log("Error: ", err)
			}
		}

	}
	// the smart contract, send an update

	async function setGreeting() {
		if (!greeting) return
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner()
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, singer);
			const transaction = await contract.setGreeting(greeting)
			await transaction.wait()
			fetchGreeting()

		}
	}
	return (
		<div className="App">
			Hello
		</div>
	);
}

export default App;
