import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // use useHistory hook to redirect programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/login', { email, password });
      console.log(res.data);
      setIsLoggedIn(true); // set isLoggedIn to true after successful login
      navigate('/ride'); // redirect to '/ride' after successful login
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {isLoggedIn && <Link to="/ride">Go to Ride Page</Link>}
    </div>
  );
};
