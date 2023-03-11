const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  ride_id: {
    type: Number,
    required: true,
    unique: true
  },
  departure: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  no_of_seats: {
    type: Number,
    required: true
  },
  price_per_seat: {
    type: Number,
    required: true
  }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
