import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import  Contract  from '../contracts/Carpool.sol/Carpool.json';

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
        const contractAddress = '0xc83458f11FD782Df6793605dD4EEEd28E026Dc16';
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
    <div>
      <h1>Create a Ride</h1>
      <form onSubmit={handleCreateRide}>
        <label>Destination:</label>
        <input type="text" value={destination} onChange={(event) => setDestination(event.target.value)} />

        <label>Source:</label>
        <input type="text" value={source} onChange={(event) => setSource(event.target.value)} />

        <label>Price:</label>
        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />

        <label>Seats Available:</label>
        <input type="number" value={seat} onChange={(event) => setSeat(event.target.value)} />

        <button type="submit">Create Ride</button>
      </form>
    </div>
  );
};
