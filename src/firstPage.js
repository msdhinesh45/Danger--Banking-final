import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for Routing
import './Styles/index.css';
import logo from './Images/bl.png';
import bankLogo from './Images/Bank-first.png';

const Index = () => {
    return (
        <div className="index-bg">
            <div className="overlay"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link to="/" style={{ color: "red", fontSize: "32px" }} className="navbar-brand title">
                        <img src={logo} alt="Bank Logo" />
                        <span className='danger-text'> Danger Banking </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Bank Details</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content mt-0 pt-0 container text-white text-center">
                <img src={bankLogo} alt="Danger Banking Log" className="mt-4 img-fluid" />
                <h1 className='mt-3'>Danger Bank💀</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <button className="btn btn-success m-2">
                        <Link to="/signup" className="text-white text-decoration-none">Sign Up</Link>
                    </button>
                    <button className="btn btn-primary m-2">
                        <Link to="/signin" className="text-white text-decoration-none">Sign In</Link>
                    </button>
                    <button className="btn btn-warning m-2">
                        <Link to="/admin" className="text-dark text-decoration-none">Admin</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Index;
