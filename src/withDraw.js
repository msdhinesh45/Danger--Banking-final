import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './Images/bl.png';
import WithdrawPic from './Images/Atm.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Withdraw = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setAccountNumber(loggedInUser.accountNumber);
      // Fetch balance from AccountDetails
      const accounts = JSON.parse(localStorage.getItem('AccountDetails')) || [];
      const user = accounts.find((user) => user.accountNumber === loggedInUser.accountNumber);
      if (user) {
        setBalance(user.balance || 0); // Initialize balance if not present
      }
    }
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .max(50000, 'Withdrawal amount cannot exceed ₹50,000')
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

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage(''); // Reset error message

    if (!accountNumber) {
      setErrorMessage('No account found. Please sign in.');
      setSubmitting(false);
      return;
    }

    // Retrieve accounts from localStorage
    let accounts = JSON.parse(localStorage.getItem('AccountDetails')) || [];

    const userIndex = accounts.findIndex((user) => user.accountNumber === accountNumber);
    if (userIndex === -1) {
      setErrorMessage('Account not found.');
      setSubmitting(false);
      return;
    }

    const user = accounts[userIndex];

    // Validate PIN using bcrypt
    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      setErrorMessage('Invalid PIN. Try again.');
      setSubmitting(false);
      return;
    }

    const withdrawAmount = parseFloat(values.amount);

    // Check for daily withdrawal limit
    const today = new Date().toDateString();
    user.transactions = user.transactions || [];

    // Calculate total withdrawn today
    const totalWithdrawnToday = user.transactions
      .filter(
        (txn) => txn.type === 'Withdraw' && new Date(txn.date).toDateString() === today
      )
      .reduce((total, txn) => total + txn.amount, 0);

    if (totalWithdrawnToday + withdrawAmount > 50000) {
      setErrorMessage(
        `Daily withdrawal limit of ₹50,000 exceeded. You have already withdrawn ₹${totalWithdrawnToday} today.`
      );
      setSubmitting(false);
      return;
    }

    // Check for sufficient balance
    if (user.balance < withdrawAmount) {
      setErrorMessage(`Insufficient balance. Current balance: ₹${user.balance}`);
      setSubmitting(false);
      return;
    }

    // Update account balance
    user.balance -= withdrawAmount;

    // Save withdrawal transaction with 12-hour formatted date
    const transaction = {
      type: 'Withdraw',
      amount: withdrawAmount,
      date: formatDate(new Date()), // Format date in 12-hour format
      balanceAfterTransaction: user.balance,
    };

    user.transactions.push(transaction);

    // Save updated accounts to localStorage
    accounts[userIndex] = user;
    localStorage.setItem('AccountDetails', JSON.stringify(accounts));

    // Update state with new balance
    setBalance(user.balance);

    // Show success message using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Withdrawal Successful!',
      text: `₹${withdrawAmount} has been withdrawn from your account.`,
      confirmButtonText: 'OK',
    });

    // Reset form inputs
    resetForm();
    setPin('');
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
                <a className="nav-link" href="/deposit">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active disabled" href="/withdraw">
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

      <div className="signin-container container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={WithdrawPic} alt="Withdraw Illustration" className="login-image" />
          </div>
          <div className="col-md-4 form-wrapper mt-5">
            <h2 className="text-center text-danger">Withdraw Money</h2>

            {/* Display current balance */}
            <div className="h4 fw-bold my-3 text-primary">
              <strong>Current Balance:</strong> ₹{balance}
            </div>

            {/* Withdraw Form */}
            <Formik
              initialValues={{ amount: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label text-light">Account Number</label>
                    <Field
                      type="text"
                      name="account"
                      className="form-control"
                      value={accountNumber}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-light">Withdraw Amount</label>
                    <Field
                      type="number"
                      name="amount"
                      className="form-control mb-3"
                      placeholder="Enter amount to withdraw"
                    />
                    <ErrorMessage name="amount" component="div" className="error-message text-danger" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-light">PIN</label>
                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Enter your PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Withdraw'}
                  </button>
                  <div className="mt-3 text-center">
                    <Link to="/reset" className="text-decoration-none">
                      <span className="text-light text-decoration-none"> Forgot PIN? Reset your</span>
                      <span className="text-danger fw-bold text-decoration-underline"> PIN </span>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Display error message if any */}
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

export default Withdraw;