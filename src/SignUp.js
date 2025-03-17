import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs"; // For password hashing
import './Styles/signup.css';
import './Styles/signin.css';
import logo from './Images/bl.png';
import { Link } from 'react-router-dom';
import SignupImg from './Images/Signup.png';

const Signup = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
    });

    // Generate a random 12-digit account number
    const generateAccountNumber = () => {
        return Math.floor(100000000000 + Math.random() * 900000000000).toString();
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        fullName: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Letters only")
            .required("Full Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("Phone Number is required"),
        pin: Yup.string()
            .matches(/^\d{6}$/, "PIN must be 6 digits")
            .required("PIN is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/\d/, "Must contain at least one number")
            .matches(/[@$!%*?&]/, "Must contain at least one special character")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    // Handle form submission
    const handleSubmit = async (values) => {
        const existingData = JSON.parse(localStorage.getItem("AccountDetails")) || [];

        // Check if user already exists
        if (existingData.some(user => user.email === values.email)) {
            setErrorMessage("Account already exists with this email");
            return;
        }

        // Hash password and PIN
        const hashedPassword = await bcrypt.hash(values.password, 10);
        const hashedPin = await bcrypt.hash(values.pin, 10);

        // Generate account number and signup date
        const newAccountNumber = generateAccountNumber();
        const signupDate = new Date().toLocaleString();

        // Create new user object
        const newUser = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            password: hashedPassword,
            pin: hashedPin,
            accountNumber: newAccountNumber,
            signupDate: signupDate,
            balance: 0, // Initialize balance to 0
            transactions: [], // Initialize empty transactions array
        };

        // Save user data to localStorage
        localStorage.setItem("AccountDetails", JSON.stringify([...existingData, newUser]));
        setSuccessMessage("Signup Complete");

        // Save logged-in user info
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        // Redirect to sign-in page after 3 seconds
        setTimeout(() => {
            setSuccessMessage("");
            navigate("/signin");
        }, 3000);
    };

    // Validate password in real-time
    const validatePassword = (password) => {
        setPasswordValidation({
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[@$!%*?&]/.test(password),
            hasMinLength: password.length >= 8,
        });
    };

    return (
        <div className="signup-bg">
            {/* Navbar */}
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

            {/* Signup Form */}
            <div className="signup-container container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <img src={SignupImg} alt="Signup Illustration" className="signup-image" />
                    </div>
                    <div className="col-md-4 form-wrapper">
                        <h2 className="text-center text-primary">Create Your Account</h2>

                        <Formik
                            initialValues={{
                                fullName: "",
                                email: "",
                                phoneNumber: "",
                                pin: "",
                                password: "",
                                confirmPassword: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange }) => (
                                <Form>
                                    {/* Full Name */}
                                    <Field
                                        type="text"
                                        name="fullName"
                                        className="my-3 form-control"
                                        placeholder="Enter your Full name"
                                    />
                                    <ErrorMessage name="fullName" component="div" className="text-danger" />

                                    {/* Email */}
                                    <Field
                                        type="email"
                                        name="email"
                                        className="my-3 form-control"
                                        placeholder="Enter your Email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />

                                    {/* Phone Number */}
                                    <Field
                                        type="text"
                                        name="phoneNumber"
                                        className="my-3 form-control"
                                        placeholder="Enter your Phone number"
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />

                                    {/* PIN */}
                                    <Field
                                        type="password"
                                        name="pin"
                                        className="my-3 form-control"
                                        placeholder="Create a 6-digit PIN"
                                    />
                                    <ErrorMessage name="pin" component="div" className="text-danger" />

                                    {/* Password */}
                                    <div className="mb-3">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            onFocus={() => setShowPasswordRequirements(true)} // Show on focus
                                            onChange={(e) => {
                                                handleChange(e); // Update form state
                                                validatePassword(e.target.value); // Validate password
                                            }}
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                        {/* Password Requirements */}
                                        {showPasswordRequirements && (
                                            <div className="text-muted mt-2">
                                                <ul>
                                                    <li style={{ color: passwordValidation.hasUppercase ? 'green' : 'red' }}>
                                                        At least one uppercase letter (A-Z)
                                                    </li>
                                                    <li style={{ color: passwordValidation.hasLowercase ? 'green' : 'red' }}>
                                                        At least one lowercase letter (a-z)
                                                    </li>
                                                    <li style={{ color: passwordValidation.hasNumber ? 'green' : 'red' }}>
                                                        At least one number (0-9)
                                                    </li>
                                                    <li style={{ color: passwordValidation.hasSpecialChar ? 'green' : 'red' }}>
                                                        At least one special character (@$!%*?&)
                                                    </li>
                                                    <li style={{ color: passwordValidation.hasMinLength ? 'green' : 'red' }}>
                                                        At least 8 characters
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="my-3 form-control"
                                        placeholder="Confirm your password"
                                        onFocus={() => setShowPasswordRequirements(false)} // Hide on focus
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
                                </Form>
                            )}
                        </Formik>

                        {/* Success and Error Messages */}
                        {successMessage && <div className="alert alert-success mt-3 text-center">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>}

                        {/* Link to Sign In */}
                        <p className="text-center text-light mt-3">
                            Already have an account? <Link to="/signin" className="text-danger">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;