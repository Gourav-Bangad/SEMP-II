import { Web3Provider } from '@ethersproject/providers';
import { useState } from 'react';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectToWallet = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts", });
	const provider = new Web3Provider(window.ethereum);
      const accounts = provider.getSigner();
      const userAddress = await accounts.getAddress();
      setAddress(userAddress);
      setIsConnected(true);
  }
 

  return (
              <div>
              <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg bg-body-tertiary ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
              <div>
              {isConnected ? (
              <button className="btn btn-light rounded-0 " type="submit" style={{width: '425.333334px',cursor:'none'}}>{address}</button>
              ) : (
              <button className="btn btn-light rounded-0" type="submit" style={{width: '150.333334px'}} onClick={connectToWallet}>Connect Wallet</button>
              )}
              </div>
            </div>
          </div>
        </nav>
</div>
  )
}

export default Navbar

