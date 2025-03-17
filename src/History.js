import React, { useEffect, useState } from 'react';
import './Styles/History.css'; // Add styles for your history page
import logo from './Images/bl.png';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import Swal from 'sweetalert2'; // Import SweetAlert

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch logged-in user details
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setAccountNumber(loggedInUser.accountNumber);

            // Fetch account details from localStorage
            const accounts = JSON.parse(localStorage.getItem('AccountDetails')) || [];
            const user = accounts.find(account => account.accountNumber === loggedInUser.accountNumber);

            if (user) {
                setBalance(user.balance || 0);
                setTransactions(user.transactions || []);
            }
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Clear logged-in user info
        navigate("/"); // Redirect to home page
    };

    // Handle clear history
    const handleClearHistory = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete your transaction history!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, clear it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear transaction history
                const accounts = JSON.parse(localStorage.getItem('AccountDetails')) || [];
                const updatedAccounts = accounts.map(account => {
                    if (account.accountNumber === accountNumber) {
                        return { ...account, transactions: [] };
                    }
                    return account;
                });

                localStorage.setItem('AccountDetails', JSON.stringify(updatedAccounts));
                setTransactions([]); // Clear transactions in state

                Swal.fire({
                    title: 'Cleared!',
                    text: 'Your transaction history has been cleared.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
            }
        });
    };

    return (
        <div className="history-bg">
            {/* Navbar */}
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
                                <a className="nav-link" href="/acchome">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/deposit">Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/withdraw">Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active disabled" href="/history">History</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger m-1" onClick={handleLogout}>
                                    LogOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Transaction History Table */}
            <div className="history-container container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-danger pt-3 mt-5">Transaction History</h2>

                        {/* Display current balance */}
                        <div className="mb-4 mt-3 text-center text-info">
                            <strong>Current Balance:</strong> ₹{balance}
                        </div>

                        {/* Clear History Button */}
                        <div className="text-center mb-4">
                            <button className="btn btn-warning" onClick={handleClearHistory}>
                                Clear History
                            </button>
                        </div>

                        {/* Transactions Table */}
                        <div className="table-responsive">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th>Transaction Type</th>
                                        <th>Amount</th>
                                        <th>Balance After Transaction</th>
                                        <th>Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length > 0 ? (
                                        transactions.map((transaction, index) => (
                                            <tr key={index}>
                                                <td>{transaction.type}</td>
                                                <td style={{ color: transaction.type === 'Withdraw' ? 'red' : 'green', fontWeight: 'bold' }}>
                                                    {transaction.type === 'Withdraw' ? '-₹' : '+₹'}{transaction.amount}
                                                </td>
                                                <td>₹{transaction.balanceAfterTransaction || balance}</td>
                                                <td>{transaction.date}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-warning">No transactions found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;