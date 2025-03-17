import React from 'react';
import './Styles/acchome.css';
import logo from './Images/bl.png';
import Homepage from './Images/homepage.png';
import Homepage2 from './Images/homepage-2.png';
import Homepage3 from './Images/homepage-3.png';

const Home = () => {
    return (
        <div className="acchome-bg">
            <div className="acchome-overlay"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Bank Logo" height="60" />
                        <span className='acchome-danger-text'>Danger Banking</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active disabled" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/deposit">Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/withdraw">Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/history">History</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn bg-danger text-light btn-acchome-logout m-1" onClick={() => window.location.href = "/"}>
                                    LogOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="acchome-content container mt-5 pt-5 text-white text-center">
                <h2>Welcome to <strong>Danger Banking</strong> 💀</h2>
                <p>
                    <strong>Danger Banking</strong> was established on <em>December 11, 2002</em>, under the visionary leadership of its owner, <strong>Dhinesh Kumar Murugesan</strong>. 
                    With branches in <em>Trichy</em>, <em>Coimbatore</em>, and <em>Tiruppur</em>, we are committed to providing innovative and secure banking solutions. 🏦
                </p>
                <p>
                    At <strong>Danger Banking</strong>, we prioritize your financial security and convenience. 
                    Whether you're depositing funds 💵, withdrawing cash 💰, or tracking your transaction history 📊, our state-of-the-art systems ensure a seamless experience. 
                    Our user-friendly platform allows you to manage your finances with ease and confidence. 💪
                </p>
                <p>
                    <strong>Why choose Danger Banking?</strong> Because we redefine banking with a focus on transparency, security, and customer satisfaction. 
                    Our motto is simple: <em>"Your Trust, Our Responsibility!"</em> With cutting-edge technology and a dedicated team, we make banking safer and more efficient than ever. 🔒
                </p>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={Homepage} className="d-block w-100" alt="Homepage" />
                        </div>
                        <div className="carousel-item">
                            <img src={Homepage2} className="d-block w-100" alt="Homepage2" />
                        </div>
                        <div className="carousel-item">
                            <img src={Homepage3} className="d-block w-100" alt="Homepage3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <h3>Quick Actions 🚀</h3>
                    <div className="acchome-quick-actions">
                    <a href="/deposit" className="btn bg-success text-light btn-acchome-deposit">Deposit 💸</a> 
                        <a href="/withdraw" className="btn bg-danger text-light btn-acchome-withdraw">Withdraw 💰</a>
                        <a href="/history" className="btn bg-info text-light btn-acchome-history">History 📊</a> 
                   
                    </div>
                    <div className="acchome-emoji-reactions mt-4">
                        <p>How do you feel about Danger Banking? Let us know! 👇</p>
                        <div className="acchome-emoji-container">
                            <span role="img" aria-label="Happy">😊</span>
                            <span role="img" aria-label="Excited">🤩</span>
                            <span role="img" aria-label="Neutral">😐</span>
                            <span role="img" aria-label="Sad">😢</span>
                            <span role="img" aria-label="Angry">😡</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;