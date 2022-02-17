
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'
const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
function App() {

	const [greeting, setGreetingValue] = useState()
	const [value, setValue] = useState('')
	const [amount, setAmount] = useState();
	const [userAccount, setUserAccount] = useState('')
	const [balance, setBalance] = useState(0)
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
	async function fetchTransfer() {
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
			const transation = await contract.transfer(userAccount, amount);
			await transation.wait();
			console.log(`${amount} Coins successfully sent to ${userAccount}`);

		}
	}
	//getBalance function

	async function getBalance() {
		if (typeof window.ethereum !== 'undefined') {
			const [account] = await window.ethereum.request({ emthod: "eth_requestAccounts" })
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
			const balance = await contract.balanceOf(account);
			console.log("Balance: ", balance.toString());
			setBalance(balance)

		}

	}

	return (
		<div className="App" style={{ display: "flex", justifyContent: "space-evenly" }}>
			<div >
				<h1>{value}</h1>
				<button onClick={fetchGreeting}>Fetch Greeting</button>
				<button onClick={setGreeting}>Set Greeting</button>
				<input onChange={((e) => { setGreetingValue(e.target.value) })} placeholder='Set greeting' value={greeting} />

			</div>
			<div style={{ marginTop: 30 }}>
				<label style={{ marginRight: "10px" }} htmlFor="address" >Address</label>
				<input type="text" id="address" onChange={((e) => { setUserAccount(e.target.value) })} value={userAccount} placeholder='Enter Address' style={{ width: 200, padding: 5, marginBottom: 20 }} />
				<br />
				<label htmlFor="amount" style={{ marginRight: "10px" }} >Amount</label>
				<input type="number" id="amount" onChange={((e) => setAmount(e.target.value))} value={amount} placeholder='Enter Amount' style={{ width: 200, padding: 5, marginBottom: 20 }} />
				<br />
				<button onClick={fetchTransfer} style={{ padding: "5px 10px", marginLeft: -70, marginBottom: 20 }}>Transfer</button><br />
				<button onClick={getBalance} style={{ padding: "5px 10px" }}>Get Balance</button>
				<span style={{ marginLeft: 35 }}>{balance.toString()}</span>
			</div>
		</div>
	);
}

export default App;
