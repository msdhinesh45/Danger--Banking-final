import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Styles/admin.css';
import logo from './Images/bl.png';
import adminLogin from './Images/adminLog.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AdminLogin = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required')
                .min(4, 'Username must be at least 4 characters')
                .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Username must contain letters and numbers'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: (values) => {
            if (values.username === 'admin45' && values.password === '@M.Sc12345') {
                // Success message with SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Redirecting to Admin Home...',
                    showConfirmButton: true,
                    timer: 2500, // Automatically close after 2.5 seconds
                }).then(() => {
                    navigate('/admin-home'); // Redirect after success
                });
            } else {
                // Error message with SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password',
                });
            }
        },
    });

    return (
        <div className="admin-login-bg">
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
                                <Link className="nav-link back-btn text-primary" to="/">Back</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="admin-login-container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <img src={adminLogin} alt="Admin Login Illustration" className="admin-login-image" />
                    </div>
                    <div className="col-md-4 form-wrapper">
                        <h1 className="text-info text-center">Admin Login</h1>
                        <form onSubmit={formik.handleSubmit} className="bg-dark p-4 rounded">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="form-control"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="text-danger">{formik.errors.username}</div>
                            ) : null}

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control mt-3"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger">{formik.errors.password}</div>
                            ) : null}

                            <button type="submit" className="btn mt-3 btn-success w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
