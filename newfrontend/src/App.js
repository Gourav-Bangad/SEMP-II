import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './components/Login';
import { Signup} from './components/Signup';
import { ConnectWallet} from './components/ConnectWallet';
import  Navbar from './components/Navbar';
import { Rides } from './components/Rides';
import {BookRides, CreateRide} from './components/CreateRide'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={() => setIsLoggedIn(false)} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/connectwallet" element={<ConnectWallet />}/>
          <Route exact path="/ride" element={<Rides />}/>
          <Route exact path="/createride" element={<CreateRide />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
