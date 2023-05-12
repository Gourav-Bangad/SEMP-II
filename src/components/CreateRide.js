import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contract from '../contracts/Carpool.sol/Carpool.json';
import './login_signup_createride.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

export const CreateRide = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function connect() {
      // Check if Web3 is available
      if (typeof window.ethereum !== 'undefined') {
        // Connect to Ethereum network
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        // Get accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        // Load contract
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const contractABI = Contract.abi; // Your contract ABI
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contract);
      } else {
        alert('Please install MetaMask to use this application');
      }
    }
    connect();
  }, []);

  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const [price, setPrice] = useState('');
  const [seat, setSeat] = useState('');

  const handleCreateRide = async (event) => {
    event.preventDefault();
    await contract.methods.createRide(destination, source, price, seat).send({ from: accounts[0] });
  };

  return (
    <div className="register-photo">
    <div className="form-container">
    <div className="image-holder3"></div>
     
      <form onSubmit={handleCreateRide}>
      <h1>Create a Ride</h1>
        <div className="form-group">
          <label>Destination:</label>
          <input type="text" className="form-control" value={destination} onChange={(event) => setDestination(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Source:</label>
          <input  type="text" className="form-control" value={source} onChange={(event) => setSource(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input  type="number" className="form-control" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Seats Available:</label>
          <input type="number" className="form-control" value={seat} onChange={(event) => setSeat(event.target.value)} />
        </div>
<div className="form-group">
<a className="btn btn-block btn-primary" type="submit" href="/ride" >Create Ride</a>
</div>
        
      </form>
    </div>
    </div>
  );
};
