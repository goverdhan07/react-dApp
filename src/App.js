import { useState} from 'react';
import {ethers} from 'ethers' 
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"


function App() {
  const [greeting, setGreetingValue] = useState('')
  
  //These are asynchronous functions cuz these guys neet to await for returning some value.
  
  async function requestAccount() { //requesAccount is going to get connected with metamask wallet of the user when we need to create a transaction.
    await window.ethereum.request({method: 'eth_requestAccounts'}) //requests account information from user's metamask wallet
  }

  async function fetchGreeting() { 
    if (typeof window.ethereum !== 'undefined') { //checks whether the metamask is present in the system or not
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider) 
      try {
        const data = await contract.greet() //value we are reading from the blockchain
        console.log('data',data)
      }catch(err) {
        console.log("Error: ", err)
        
      }



    }

  }

  async function setGreeting() {
    if(!greeting) return
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      await transaction.wait() //waiting for transaction to be complete on the blockchain
      fetchGreeting()



    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <button onClick = {fetchGreeting}>Fetch Greeting</button>
        <button onClick = {setGreeting}>Set Greeting</button>
        <input
          onChange= {e => setGreetingValue(e.target.value)}
          placeholder="set greeting"
          value={greeting}
          />
      </header>
    </div>
  );
}

export default App;
