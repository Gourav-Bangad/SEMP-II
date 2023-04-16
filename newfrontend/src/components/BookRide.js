import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Web3 from 'web3';
import Contract from '../contracts/Carpool.sol/Carpool';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css';

export const BookRide = () => {
  const [web3, setWeb3] = useState(null);
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [numSeats, setNumSeats] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

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
  if (numSeats > 0 && numSeats <= selectedRide.seat) {
    setNumSeats(numSeats);
    setTotalPrice(numSeats * selectedRide.price);
  }
  else {
  setShowAlert(true);
  }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseModal = () => {
    handleClose();
    setNumSeats(0);
    setTotalPrice(0);
    setShowAlert(false);
  };

  const handleBookRide = async () => {
    const contract = new web3.eth.Contract(Contract.abi, '0x2F5ac426AfE728c143A4276A97B239545E38BfA0');
    const accounts = await web3.eth.getAccounts();
    setShow(false);
    const confirmed = true;
    if (confirmed) {
      await contract.methods.bookRide(selectedRide.rideId, numSeats).send({
        from: accounts[0],
        value: web3.utils.toWei(totalPrice.toString(), 'wei')
      });
      
      // alert('Ride booked successfully!');
      window.location.reload();
    }
    else{
      alert('Error');
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
              <button className= "BR-button" onClick={() => {setSelectedRide(ride);
              handleShow();}} >Book Ride</button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedRide && <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm your booking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form.Group className="form-group-1">
        <Form.Label>Book Ride to {selectedRide.destination} ?</Form.Label>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Price per seat:</Form.Label>
          <Form.Control type="text" value={selectedRide.price} readOnly />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Number of seats:</Form.Label>
          <Form.Control
            type="number"
            id="num-seats-input"
            value={numSeats}
            onChange={handleNumSeatsChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Total Price:</Form.Label>
          <Form.Control type="text" value={totalPrice} readOnly />
        </Form.Group>
        {/* {showAlert && (
          <div className="alert alert-danger" role="alert">
            Please enter a valid number of seats!
          </div>
        )} */}
        {showAlert && (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    Please enter a valid number of seats!
    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)}
        </Modal.Body>
        <Modal.Footer>
          <Button  variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleBookRide}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    }
    </div>
    
  );
};