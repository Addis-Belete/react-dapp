
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

	return (
		<div className="App">
			Hello
		</div>
	);
}

export default App;
