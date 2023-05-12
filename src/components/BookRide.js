import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contract from '../contracts/Carpool.sol/Carpool';

export const BookRide = () => {
  const [web3, setWeb3] = useState(null);
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [numSeats, setNumSeats] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function connect() {
      // Check if Web3 is available
      if (typeof window.ethereum !== 'undefined') {
        // Connect to Ethereum network
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        // Load contract
        const contractAddress = '0x2F5ac426AfE728c143A4276A97B239545E38BfA0';
        const contractABI = Contract.abi; // Your contract ABI
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Get all rides
        const allRides = await contract.methods.getAllRides().call();
        setRides(allRides);
      } else {
        alert('Please install MetaMask to use this application');
      }
    }
    connect();
  }, []);

  const handleNumSeatsChange = (event) => {
    const numSeats = parseInt(event.target.value);
    if (numSeats > 0) {
      setNumSeats(numSeats);
      setTotalPrice(numSeats * selectedRide.price);
    }
  };

  const handleBookRide = async () => {
    const contract = new web3.eth.Contract(Contract.abi, '0x2F5ac426AfE728c143A4276A97B239545E38BfA0');
    const accounts = await web3.eth.getAccounts();
    const confirmed = window.confirm(`
      Book ride to ${selectedRide.destination}?
      Price per seat: ${selectedRide.price}
      Number of seats: ${numSeats}
      Total Price: ${totalPrice}
    `);
    if (confirmed) {
      await contract.methods.bookRide(selectedRide.rideId, numSeats).send({
        from: accounts[0],
        value: web3.utils.toWei(totalPrice.toString(), 'wei')
      });
      alert('Ride booked successfully!');
      window.location.reload();
    }
  };

  return (

    <div className="pcontainer">
      <h1 className='allrides'>All Rides</h1>
      <div className="row">
        {rides.map((ride) => (
          <div className="col-sm-4" key={ride.rideId}>
            <div className="brcard">
              <h2>{ride.destination}</h2>
              <p>Source: {ride.source}</p>
              <p>Price: {ride.price}</p>
              <p>Seats Available: {ride.seat}</p>
              <button className= "BR-button" onClick={() => setSelectedRide(ride)}>Book Ride</button>
              {/* <button onClick={() => setSelectedRide(ride)} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Book Ride</button> */}
            </div>
          </div>
        ))}
      </div>
      
      
      {selectedRide && (
        <div className="book-ride-popup">
          <div className="brcard">
          <h2>Book Ride - {selectedRide.destination}</h2>
          <p>Price per seat: {selectedRide.price}</p>
          <label htmlFor="num-seats-input">Number of seats:</label>
          <input type="number" id="num-seats-input" value={numSeats} onChange={handleNumSeatsChange} />
          <p>Total Price: {totalPrice}</p>
          <button className= "BR-button" onClick={handleBookRide}>Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
    
  );
};