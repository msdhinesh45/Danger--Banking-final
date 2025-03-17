import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Images/bl.png';
import './Styles/signin.css';
import './Styles/Reset.css'; // Import Reset.css
import Swal from 'sweetalert2';

const ResetPin = () => {
    const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP, 3: New PIN
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Generate a random 6-digit OTP
    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    // Validation schema for email/phone and password
    const step1ValidationSchema = Yup.object({
        emailOrPhone: Yup.string()
            .required("Email or Phone Number is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    // Validation schema for OTP
    const step2ValidationSchema = Yup.object({
        otp: Yup.string()
            .matches(/^\d{6}$/, "OTP must be 6 digits")
            .required("OTP is required"),
    });

    // Validation schema for new PIN
    const step3ValidationSchema = Yup.object({
        newPin: Yup.string()
            .matches(/^\d{6}$/, "PIN must be 6 digits")
            .required("New PIN is required"),
        confirmPin: Yup.string()
            .oneOf([Yup.ref("newPin"), null], "PINs must match")
            .required("Confirm PIN is required"),
    });

    // Handle step 1 submission (email/phone and password)
    const handleStep1Submit = async (values) => {
        const accounts = JSON.parse(localStorage.getItem("AccountDetails")) || [];
        const user = accounts.find(account => 
            (account.email === values.emailOrPhone || account.phoneNumber === values.emailOrPhone) &&
            bcrypt.compareSync(values.password, account.password)
        );

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email/phone or password',
            });
            return;
        }

        setUser(user);
        const otp = generateOtp();
        setGeneratedOtp(otp);

        // Show OTP in SweetAlert
        Swal.fire({
            title: 'OTP Generated',
            html: `
                <div style="text-align: center;">
                    <p>Your OTP has been sent to <strong>${user.email || user.phoneNumber}</strong>.</p>
                    <p style="font-size: 24px; font-weight: bold; color: #d9534f;">${otp}</p>
                    <p>Please enter this OTP in the next step.</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'OK',
        });

        setStep(2);
    };

    // Handle step 2 submission (OTP validation)
    const handleStep2Submit = (values) => {
        if (values.otp !== generatedOtp) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid OTP. Please try again.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'OTP Verified',
            text: 'OTP verified. Please set a new PIN.',
        });

        setStep(3);
    };

    // Handle step 3 submission (new PIN)
    const handleStep3Submit = async (values) => {
        const accounts = JSON.parse(localStorage.getItem("AccountDetails")) || [];
        const userIndex = accounts.findIndex(account => account.accountNumber === user.accountNumber);

        if (userIndex === -1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User not found.',
            });
            return;
        }

        // Hash the new PIN
        const hashedPin = await bcrypt.hash(values.newPin, 10);
        accounts[userIndex].pin = hashedPin;

        // Update local storage
        localStorage.setItem("AccountDetails", JSON.stringify(accounts));

        Swal.fire({
            icon: 'success',
            title: 'PIN Updated',
            text: 'PIN updated successfully. Redirecting to Withdraw page...',
        }).then(() => {
            navigate("/withdraw");
        });
    };

    return (
        <div className="signin-bg">
            <div className="overlay"></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Bank Logo" height="60" />
                        <span className='danger-text'>Danger Banking</span>
                    </a>
                </div>
            </nav>

            <div className="signin-container container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <img src={logo} alt="Bank Logo" className="login-image" />
                    </div>
                    <div className="col-md-4 form-wrapper">
                        <h2 className="text-center text-danger">Reset PIN</h2>

                        {/* Step 1: Email/Phone and Password */}
                        {step === 1 && (
                            <>
                                <Formik
                                    initialValues={{ emailOrPhone: "", password: "" }}
                                    validationSchema={step1ValidationSchema}
                                    onSubmit={handleStep1Submit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label text-light">Email or Phone Number</label>
                                                <Field
                                                    type="text"
                                                    name="emailOrPhone"
                                                    className="form-control"
                                                    placeholder="Enter your email or phone number"
                                                />
                                                <ErrorMessage name="emailOrPhone" component="div" className="text-danger" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-light">Password</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Next</button>
                                        </Form>
                                    )}
                                </Formik>
                                <p className="text-center text-light mt-3">
                                    I remember my pin <Link to="/withdraw" className="text-danger">Back</Link>
                                </p>
                            </>
                        )}

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                            <>
                                <Formik
                                    initialValues={{ otp: "" }}
                                    validationSchema={step2ValidationSchema}
                                    onSubmit={handleStep2Submit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label text-light">OTP</label>
                                                <Field
                                                    type="text"
                                                    name="otp"
                                                    className="form-control"
                                                    placeholder="Enter OTP"
                                                />
                                                <ErrorMessage name="otp" component="div" className="text-danger" />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
                                        </Form>
                                    )}
                                </Formik>
                                <p className="text-center text-light mt-3">
                                    I remember my pin <Link to="/withdraw" className="text-danger">Back</Link>
                                </p>
                            </>
                        )}

                        {/* Step 3: New PIN */}
                        {step === 3 && (
                            <>
                                <Formik
                                    initialValues={{ newPin: "", confirmPin: "" }}
                                    validationSchema={step3ValidationSchema}
                                    onSubmit={handleStep3Submit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label text-light">New PIN</label>
                                                <Field
                                                    type="password"
                                                    name="newPin"
                                                    className="form-control"
                                                    placeholder="Enter new 6-digit PIN"
                                                />
                                                <ErrorMessage name="newPin" component="div" className="text-danger" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-light">Confirm PIN</label>
                                                <Field
                                                    type="password"
                                                    name="confirmPin"
                                                    className="form-control"
                                                    placeholder="Confirm new PIN"
                                                />
                                                <ErrorMessage name="confirmPin" component="div" className="text-danger" />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Set New PIN</button>
                                        </Form>
                                    )}
                                </Formik>
                                <p className="text-center text-light mt-3">
                                    I remember my pin <Link to="/withdraw" className="text-danger">Back</Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPin;