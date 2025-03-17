import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs'; // For password hashing
import './Styles/signin.css';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import logo from './Images/bl.png';
import LoginPic from './Images/Login.png';

const SignIn = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    // Validation Schema
    const validationSchema = Yup.object({
        emailOrPhone: Yup.string().required('Email or Phone Number is required'),
        password: Yup.string().required('Password is required'),
    });

    // Handle Submit
    const handleSubmit = async (values, { setSubmitting }) => {
        const storedUserDetails = JSON.parse(localStorage.getItem("AccountDetails")) || [];

        if (storedUserDetails.length === 0) {
            setErrorMessage('No account found. Please sign up first.');
            setSubmitting(false);
            return;
        }

        // Find user by email or phone number
        const user = storedUserDetails.find(user => 
            user.email === values.emailOrPhone || user.phoneNumber === values.emailOrPhone
        );

        if (!user) {
            setErrorMessage('Invalid email/phone number or password. Please try again.');
            setSubmitting(false);
            return;
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(values.password, user.password);

        if (isPasswordValid) {
            setIsSuccess(true);
            // Save logged-in user info
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
            setErrorMessage('Invalid email/phone number or password. Please try again.');
        }
        setSubmitting(false);
    };

    // Redirect on successful login
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate("/acchome"); // Use navigate instead of window.location.href
            }, 3000);
        }
    }, [isSuccess, navigate]);

    return (
        <div className="signin-bg">
            <div className="overlay"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand title">
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

            <div className="signin-container container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <img src={LoginPic} alt="Login Illustration" className="login-image" />
                    </div>
                    <div className="col-md-4 form-wrapper bg-dark">
                        <h2 className="text-center h1 text-primary">Sign In</h2>
                        <Formik 
                            initialValues={{ emailOrPhone: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {errorMessage && <p className="error-message h5 mt-3 text-danger text-center">{errorMessage}</p>}
                                    {isSuccess && <p className="text-success text-center">Sign In Successful! Redirecting...</p>}
                                    <div className="mb-3">
                                        <label className="form-label text-light">Email / Phone Number</label>
                                        <Field 
                                            type="text" 
                                            name="emailOrPhone" 
                                            className="form-control" 
                                            placeholder="Enter your email or phone number" 
                                        />
                                        <ErrorMessage name="emailOrPhone" component="div" className="error-message text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-light">Password</label>
                                        <Field 
                                            type="password" 
                                            name="password" 
                                            className="form-control" 
                                            placeholder="Enter your password" 
                                        />
                                        <ErrorMessage name="password" component="div" className="error-message text-danger" />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <p className="text-center text-light mt-3">
                            Create New Account <Link to="/signup" className="text-danger">Sign Up</Link>
                        </p>
                        <p className="text-center text-light mt-3">
                            Forget Password? <Link to="/forgetpass" className="text-danger">Reset Password</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;