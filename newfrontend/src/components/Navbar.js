import React, { useState } from 'react';
import BackgroundImage from './Background';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [walletId, setWalletId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setWalletId(accounts[0]);
      } else {
        console.error('Metamask not installed');
      }
    } catch (err) {
      console.error(err);
    }
    setIsConnecting(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Carpooling</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">SignUp</a>
              </li>
              {isLoggedIn ? (
                <a className="btn btn-outline-dark" onClick={handleLogout} href="/">Logout</a>
              ): (
                <a className="btn btn-outline-dark" href="/login">Login</a>
              )}
            </ul>
            <button  className="btn btn-outline-dark" style={{marginTop:"0"}}  onClick={connectWallet} disabled={isConnecting || walletId}>{
              isConnecting
                ? 'Connecting...'
                : walletId
                  ? walletId
                  : 'Connect Wallet'
            }</button>
          </div>
        </div>
      </nav>
      {(!isLoggedIn && window.location.pathname === '/') && (
        <BackgroundImage />
      )}
    </>
  );
};

export default Navbar;
