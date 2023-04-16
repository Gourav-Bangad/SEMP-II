import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import './Login.css';

export const Login = ({isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/login', { email, password });
      console.log(res.data);
      setIsLoggedIn(true);
      navigate('/ride');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="register-photo">
    <div className="form-container">
    <div className="image-holder2"></div>
    
      <form onSubmit={handleSubmit}>
      <h2 class="text-center"><strong>Sign </strong>in</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
          className="form-control"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
          className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div >
        <button type="submit">Login</button>
      </form>
      {isLoggedIn && <Link to="/ride">Go to Ride Page</Link>}
    </div>
    </div>

  );
};


