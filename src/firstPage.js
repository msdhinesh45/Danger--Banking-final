import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/index.css';
import logo from './Images/bl.png';
import bankLogo from './Images/Bank-first.png';

const Index = () => {
    return (
        <div className="index-bg">
            <div className="overlay"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand title">
                        <img src={logo} alt="Bank Logo" className="logo" />
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
            <div className="content container text-white text-center">
                <img src={bankLogo} alt="Danger Banking Logo" className="mt-4 img-fluid animated-logo" />
                <h1 className='mt-3 animated-text'>Danger Bank💀</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <button className="btn btn-success m-2 animated-btn">
                        <Link to="/signup" className="text-white text-decoration-none">Sign Up</Link>
                    </button>
                    <button className="btn btn-primary m-2 animated-btn">
                        <Link to="/signin" className="text-white text-decoration-none">Sign In</Link>
                    </button>
                    <button className="btn btn-warning m-2 animated-btn">
                        <Link to="/admin" className="text-dark text-decoration-none">Admin</Link>
                    </button>
                </div>
            </div>
            <style>{`
                .index-bg {
                    position: relative;
                    height: 100vh;
                    background: linear-gradient(135deg, #000000, #1a1a1a);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    animation: fadeIn 1.5s ease-in-out;
                }
                .logo {
                    width: 50px;
                    margin-right: 10px;
                }
                .animated-logo {
                    animation: bounce 2s infinite;
                }
                .animated-text {
                    font-size: 2.5rem;
                    font-weight: bold;
                    text-shadow: 2px 2px 10px red;
                    animation: fadeInDown 1.5s ease-in-out;
                }
                .animated-btn {
                    transition: transform 0.3s ease-in-out;
                    border: 2px solid white;
                    padding: 10px 20px;
                    border-radius: 10px;
                }
                .animated-btn:hover {
                    transform: scale(1.1);
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Index;
