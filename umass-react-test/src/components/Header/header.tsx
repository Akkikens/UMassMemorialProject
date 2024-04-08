import React from 'react';
import { Link } from 'react-router-dom'; // If you are using react-router for navigation

const HeaderComponent = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid"> 
        <Link className="navbar-brand" to="/">UMass React Test Project</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app">Application</Link>
            </li>
            {/* Add more nav items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;

