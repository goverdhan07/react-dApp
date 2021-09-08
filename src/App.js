import { useState} from 'react';
import {ethers} from 'ethers' 
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"


function App() {
  const [greeting, setGreetingValue] = useState()
  
  //These are asynchronous functions cuz these guys neet to await for returning some value.
  
  async function requestAccount() { //requesAccount is going to get connected with metamask wallet of the user when we need to create a transaction.
    
  }

  async function fetchGreeting() { 
    if (typeof window.ethereum !== 'undefined') { //checks whether the metamask is present in the system or not
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greetAddress, Greeter.abi, provider) 
      try {
        const data = await contract.great() //value we are reading from the blockchain
        console.log('data',data)
      }catch(err) {
        console.log("Error: ", err)
        
      }



    }

  }

  async function setGreeting() {

  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
