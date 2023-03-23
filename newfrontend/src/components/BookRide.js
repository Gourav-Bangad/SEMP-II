import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contract from '../contracts/Carpool.sol/Carpool.json';

export const BookRide = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState(1);

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

        // Get all rides
        const rides = await contract.methods.getAllRides().call();
        console.log(rides);
        setRides(rides);
      } else {
        alert('Please install MetaMask to use this application');
      }
    }
    connect();
  }, []);

  const handleRideSelect = (event) => {
    const rideId = parseInt(event.target.value);
    const selectedRide = rides.find((ride) => ride.id === rideId);
    setSelectedRide(selectedRide);
  };

  const handleSeatsToBookChange = (event) => {
    setSeatsToBook(parseInt(event.target.value));
  };

  const handleBookRide = async (event) => {
    event.preventDefault();
    await contract.methods.bookRide(selectedRide.id, seatsToBook).send({ from: accounts[0], value: selectedRide.price * seatsToBook });
    // Update the list of rides
    const updatedRides = await contract.methods.getAllRides().call();
    setRides(updatedRides);
    setSelectedRide(null);
    setSeatsToBook(1);
  };

  return (
    <div>
      <h1>Book a Ride</h1>
      {selectedRide ? (
        <div>
          <h2>{selectedRide.source} to {selectedRide.destination}</h2>
          <p>Price: {selectedRide.price} Ether</p>
          <form onSubmit={handleBookRide}>
            <label>Seats to book:</label>
            <input type="number" value={seatsToBook} onChange={handleSeatsToBookChange} />
            <button type="submit">Book Ride</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Select a ride:</p>
          <select onChange={handleRideSelect}>
            <option value="">--Select a ride--</option>
            {rides.map((ride) => (
              <option key={ride.id} value={ride.id}>
                {ride.source} to {ride.destination} ({ride.availableSeats} seats available)
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
