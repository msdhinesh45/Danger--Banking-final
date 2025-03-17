import React from 'react';
import './Styles/alldata.css'; // Add styles for the AllData page
import logo from './Images/bl.png';

const AllData = () => {
    // Retrieve all user data from localStorage
    const users = JSON.parse(localStorage.getItem("AccountDetails")) || [];

    // Function to remove a user by index
    const removeUser = (index) => {
        const updatedUsers = users.filter((user, i) => i !== index); // Filter out the user to be removed
        localStorage.setItem("AccountDetails", JSON.stringify(updatedUsers)); // Update localStorage
        window.location.reload(); // Refresh the page to reflect changes
    };

    return (
        <div className="all-data-bg">
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
                                <a className="nav-link" href="/admin-home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active disabled" href="/alldata">All Data</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger m-1" onClick={() => window.location.href = "/"}>
                                    LogOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="all-data-container container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-danger mb-4 mt-5 pt-5">All User Data</h2>
                        <div className="table-responsive">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Signup Date & Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.signupDate}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeUser(index)}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllData;