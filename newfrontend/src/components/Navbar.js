import React from 'react';

const Navbar = ({ isLoggedIn, handleLogout }) => {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar w/ text</a>
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
              <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
            ): (
              <a className="btn btn-outline-dark" href="/login">Login</a>
            )}
          </ul>
          <a className="btn btn-outline-dark" href="/connectwallet">Connect Wallet</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
