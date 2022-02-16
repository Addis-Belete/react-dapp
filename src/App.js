
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'
const greeterAddress = "0x82b6fea3824b3d0f4bd36e2e8384cfb21dfae9fb"
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
function App() {

	const [greeting, setGreetingValue] = useState()
	const [value, setValue] = useState('')
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
				const data = await contract.greet()
				setValue(data)
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
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
			const transaction = await contract.setGreeting(greeting)
			await transaction.wait()
			setGreetingValue('')
			fetchGreeting()

		}
	}
	return (
		<div className="App">
			<header className='App-header'>
				<h1>{value}</h1>
				<button onClick={fetchGreeting}>Fetch Greeting</button>
				<button onClick={setGreeting}>Set Greeting</button>
				<input onChange={((e) => { setGreetingValue(e.target.value) })} placeholder='Set greeting' value={greeting} />

			</header>
		</div>
	);
}

export default App;
