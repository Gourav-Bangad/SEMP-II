import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/signup', { email, password });
      console.log(res.data);
      // show success message to user and redirect to login page
    } catch (err) {
      console.log(err.response.data);
      // show error message to user
    }
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center"><strong>Create</strong> an account.</h2>
          <div className="form-group">
            <input className="form-control" type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <input className="form-control" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <button className="btn btn-success btn-block" type="submit">Sign Up</button></div>
          <a className="already" href="/login">You already have an account? Login here.</a>
        </form>
      </div>
    </div>
  );
};
