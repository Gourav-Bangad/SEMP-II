import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

export const ConnectWallet = ({setIsConnected}) => { 
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get Web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get user account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setIsConnected(true);
          console.error(setIsConnected);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Please install MetaMask');
      }
    };

    connect();
  }, []);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get user account
        const accounts = await web3.eth.getAccounts();
        
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Please install MetaMask');
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected to account: {account}</p>
      ) : (
        <button onClick={handleConnect}>Connect to MetaMask</button>
      )}
    </div>
  );
};
