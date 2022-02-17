import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json'

const tokenAddress = "0x07E85EA990d273eA5d18192a403Be08fd13FAA38"
function App() {
	const [amount, setAmount] = useState(0);
	const [userAccount, setUserAccount] = useState('')
	const [balance, setBalance] = useState('')
	const [message, setMessage] = useState(false);
	// request access to users MetaMask account
	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
	}
	async function fetchTransfer() {
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

			const transation = await contract.transfer(userAccount, amount);
			try {
				await transation.wait();
				setMessage(true)

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
	useEffect(() => {
		setTimeout(() => {
			if (message === true) {
				setMessage(false)
				setAmount(0)
				setUserAccount('')

			}
		}, 5000)

	}, [message])


	return (
		<div className="w-1/4 mx-auto mt-40 border shadow-lg  p-4" style={{ display: "flex", justifyContent: "space-evenly" }}>

			<div style={{ marginTop: 30 }}>
				<h1 className='uppercase font-bold mb-5 text-center text-lg rounded-lg'>My First Full-Stack Dapp</h1>
				<p className={`${message ? "block" : "hidden"} text-xs text-green-700`} >{`${amount} Coins successfully sent to ${userAccount}`}</p>
				<label className='font-bold' style={{ marginRight: "10px" }} htmlFor="address" >Account</label>
				<input className='border ' type="text" id="address" onChange={((e) => { setUserAccount(e.target.value) })} value={userAccount} placeholder='Enter Your Account Address' style={{ width: 250, padding: 5, marginBottom: 20 }} />
				<br />
				<label className='font-bold' htmlFor="amount" style={{ marginRight: "10px" }} >Amount</label>
				<input className='border' type="number" id="amount" onChange={((e) => setAmount(e.target.value))} value={amount} placeholder='Enter Amount' style={{ width: 250, padding: 5, marginBottom: 20 }} />
				<br />
				<button className='border ' onClick={fetchTransfer} style={{ padding: "5px 10px", marginBottom: 20, marginLeft: "21%" }}>Transfer</button><br />
				<button className='border mb-10' onClick={getBalance} style={{ padding: "5px 10px", marginLeft: "21%" }}>Get Balance</button>
				<span className='text-green-700' style={{ marginLeft: "20px" }}>{`  ${balance}`}</span>

			</div>
		</div>
	);
}

export default App;
