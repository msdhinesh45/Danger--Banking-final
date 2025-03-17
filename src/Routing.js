import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter
import FirstPage from "./firstPage";
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './Signin';
import Deposit from './Deposit';
import Withdraw from './withDraw';
import AdminHome from './Admin-home';
import Admin from './Admin';
import AllData from './Alldata';
import History from './History'
import AccountHome from './AccountHome'
import Reset from './Reset'
import ForgetPasswordPage from "./Forget";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/alldata" element={<AllData />} />
      <Route path="/history" element={<History />} />
      <Route path="/acchome" element={<AccountHome />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/forgetpass" element={<ForgetPasswordPage />} />
    </Routes>
  );
};

export default Routing;
