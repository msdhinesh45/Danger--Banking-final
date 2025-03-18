import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from './Images/bl.png';
import DepositPic from './Images/deposit.png';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Deposit = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch logged-in user details on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setAccountNumber(loggedInUser.accountNumber);
      // Fetch balance from AccountDetails
      const users = JSON.parse(localStorage.getItem('AccountDetails')) || [];
      const user = users.find((user) => user.accountNumber === loggedInUser.accountNumber);
      if (user) {
        setBalance(user.balance || 0); // Initialize balance if not present
      }
    }
  }, []);

  // Validation schema for deposit amount
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .max(100000, 'Deposit amount cannot exceed ₹1,00,000')
      .typeError('Amount must be a number'),
  });

  // Function to format date in 12-hour format
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour format
    };
    return new Date(date).toLocaleString('en-IN', options);
  };

  // Handle deposit submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setErrorMessage('');

    if (!accountNumber) {
      setErrorMessage('No account found. Please sign in.');
      setSubmitting(false);
      return;
    }

    const depositAmount = parseFloat(values.amount);

    let users = JSON.parse(localStorage.getItem('AccountDetails')) || [];

    const userIndex = users.findIndex((user) => user.accountNumber === accountNumber);
    if (userIndex === -1) {
      setErrorMessage('Account not found.');
      setSubmitting(false);
      return;
    }

    const user = users[userIndex];

    // Ensure transactions array exists
    user.transactions = user.transactions || [];

    // Check daily deposit limit
    const today = new Date().toDateString();

    // Calculate total deposited today
    const totalDepositedToday = user.transactions
      .filter(
        (tx) => tx.type === 'Deposit' && new Date(tx.date).toDateString() === today
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    if (totalDepositedToday + depositAmount > 100000) {
      setErrorMessage(
        `Daily deposit limit of ₹1,00,000 exceeded. You have already deposited ₹${totalDepositedToday} today.`
      );
      setSubmitting(false);
      return;
    }

    // Update balance
    user.balance = (user.balance || 0) + depositAmount;

    // Add transaction to history with 12-hour formatted date
    const transaction = {
      type: 'Deposit',
      amount: depositAmount,
      date: formatDate(new Date()), // Format date in 12-hour format
      balanceAfterTransaction: user.balance,
    };

    user.transactions.push(transaction);

    // Save updated data to localStorage
    users[userIndex] = user;
    localStorage.setItem('AccountDetails', JSON.stringify(users));

    // Update state with new balance
    setBalance(user.balance);

    // Show success message using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Deposit Successful!',
      text: `₹${depositAmount} has been deposited to your account. Current balance: ₹${user.balance}`,
      confirmButtonText: 'OK',
    });

    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="signin-bg">
      <div className="overlay"></div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Bank Logo" height="60" />
            <span className="danger-text">Danger Banking</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/acchome">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active disabled" href="/deposit">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/withdraw">
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/history">
                  History
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger m-1" onClick={() => navigate('/')}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="signin-container container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={DepositPic} alt="Deposit Illustration" className="login-image" />
          </div>
          <div className="col-md-4 form-wrapper">
            <h2 className="text-center text-danger">Deposit Money</h2>

            {/* Display current balance */}
            <div className="h4 fw-bold my-3 text-primary">
              <strong>Current Balance:</strong> ₹{balance}
            </div>

            {/* Deposit Form */}
            <Formik initialValues={{ amount: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label text-light">Account Number</label>
                    <Field type="text" name="account" className="form-control" value={accountNumber} disabled />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">Deposit Amount</label>
                    <Field
                      type="number"
                      name="amount"
                      className="form-control mb-3"
                      placeholder="Enter amount to deposit"
                    />
                    <ErrorMessage name="amount" component="div" className="error-message text-danger" />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Deposit'}
                  </button>
                </Form>
              )}
            </Formik>

            {/* "Want to Withdraw?" Button with Improved Design */}
            <div className="mt-3 text-center">
              <button
                className="btn btn-outline-danger w-100 p-3 fw-bold"
                onClick={() => navigate('/withdraw')}
                style={{
                  fontSize: '1.2rem',
                  borderRadius: '10px',
                  border: '2px solid #dc3545',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#dc3545';
                }}
              >
                Want to Withdraw? Click Here
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-danger mt-3">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;