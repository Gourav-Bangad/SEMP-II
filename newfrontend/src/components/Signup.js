import React, { useState } from 'react';
import axios from 'axios';
//import './signup.css';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/signup', { name, email, password });
      console.log(res.data);
      // show success message to user and redirect to login page
    } catch (err) {
      console.log(err.response.data);
      // show error message to user
    }
  };

  return (
    <div class="register-photo">
<div class="form-container">
<div class="image-holder1"></div>
      
      <form onSubmit={handleSubmit}>
      <h2 class="text-center"><strong>Create </strong>an account</h2>
        <div class="form-group">
          <label htmlFor="name">Name:</label>
          <input
           class="form-control"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="email">Email:</label>
          <input
           class="form-control"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="password">Password:</label>
          <input
           class="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-group">
        <button  type="submit">Sign up</button>
        </div>
        
      </form>
    </div>
    </div>
  );
};