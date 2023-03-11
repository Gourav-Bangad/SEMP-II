import React from 'react'
import { Link } from 'react-router-dom';

export const Rides = () => {
  return (
    <div>
      <Link to="/bookride">Book Ride</Link>
        <br />
      <Link to="/createride">Create Ride</Link>
    </div>
  );
};
