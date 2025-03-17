import React from 'react';
import './Styles/home.css';
import logo from './Images/bl.png';
import Homepage from './Images/homepage.png';
import Homepage2 from './Images/homepage-2.png';
import Homepage3 from './Images/homepage-3.png';

const Home = () => {
    return (
        <div className="home-bg">
            <div className="overlay"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Bank Logo" height="60" />
                        <span className='danger-text'>Danger Banking</span>
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
                                <a className="nav-link" href="/signup">Create Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/signin">SignIn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content pt-4 mt-5 container text-white text-center">
                <h2>Welcome to <strong>Danger Banking</strong> 💀</h2>
                <p>
                    <strong>Danger Banking</strong> was established on <em>December 11, 2002</em>, under the visionary leadership of its owner, <strong>Dhinesh Kumar Murugesan</strong>. 
                    With branches in <em>Trichy</em>, <em>Coimbatore</em>, and <em>Tiruppur</em>, we are committed to providing innovative and secure banking solutions.
                </p>
                <p>
                    At <strong>Danger Banking</strong>, we prioritize your financial security and convenience. 
                    Whether you're depositing funds, withdrawing cash, or tracking your transaction history, our state-of-the-art systems ensure a seamless experience. 
                    Our user-friendly platform allows you to manage your finances with ease and confidence.
                </p>
                <p>
                    <strong>Why choose Danger Banking?</strong> Because we redefine banking with a focus on transparency, security, and customer satisfaction. 
                    Our motto is simple: <em>"Your Trust, Our Responsibility!"</em> With cutting-edge technology and a dedicated team, we make banking safer and more efficient than ever.
                </p>
                <p>
                    <strong>Getting Started:</strong> If you're already a registered user, simply <a href="/signin" className="h4 btn-signin text-success">Sign In</a> to access your account. 
                    New to Danger Banking? <a href="/signup" className="h4 btn-signup text-primary">Create an Account</a> today and experience the future of banking!
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
                    <h3>Our Services 🚀</h3>
                    <p>
                        <strong>Deposit and Withdraw 💸:</strong> Easily deposit funds into your account or withdraw cash at any of our branches. 
                        Our advanced systems ensure quick and secure transactions.
                    </p>
                    <p>
                        <strong>Transaction History 📊:</strong> Keep track of all your transactions with our detailed history feature. 
                        Monitor your finances and stay in control of your spending.
                    </p>
                    <p>
                        <strong>Security First 🔒:</strong> We use the latest encryption technologies to protect your data and ensure your transactions are safe. 
                        With Danger Banking, your money is in safe hands.
                    </p>
                    <div className="emoji-reactions">
                        <p>How do you feel about Danger Banking? Let us know! 👇</p>
                        <div className="emoji-container">
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