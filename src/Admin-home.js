import React from 'react';
import './Styles/adminHome.css';
import logo from './Images/bl.png';

const Home = () => {
    return (
        <div className="home-bg  admin-home">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Bank Logo" height="55" />
                        <span className="danger-text">Danger Banking</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active disabled" href="#">Admin Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/alldata">All Data</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-danger text-light" href="/">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{height:"160px"}} className="mt-5 text-light container text-center">
                <h2>Welcome to <strong>Danger Banking</strong> 💀</h2>
                <p>Your trusted platform for secure and efficient banking management.</p>

                <div className="admin-actions mt-4">
                    <h4 className="text-success">Admin Dashboard</h4>
                    <p>Manage and monitor all banking operations with ease:</p>
                    <ul className="text-start d-inline-block">
                        <li>✔️ View and Manage Customer Accounts</li>
                        <li>✔️ Removing Customer Accounts </li>
                    </ul>
                </div>

                <div className="admin-tips mt-4">
                    <h5>Admin Tips:</h5>
                    <p className="text-light">Ensure all customer data is kept confidential. Regularly review security settings and update passwords for enhanced security.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
