import React from 'react';
import { Link } from 'react-router-dom';

export const Rides = () => {
  return (
    <div className="rides-container">
      <div className="card">
      <div class="content-overlay"></div>
      <img class="content-image" src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
      <div class="content-details">
        <h2>Book a Ride</h2>
        <p>Find and book rides with drivers going your way.</p>
        <Link to="/bookride">Book Ride</Link>
      </div>
      </div>
      <div className="card">
      <div class="content-overlay"></div>
      <img class="content-image" src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
      <div class="content-details">
        <h2>Create a Ride</h2>
        <p>Offer a ride to others and earn money while traveling.</p>
        <Link to="/createride">Create Ride</Link>
        </div>
      </div>
    </div>
  );
};
