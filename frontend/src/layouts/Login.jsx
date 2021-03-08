import React from 'react';
import LoginNavbar from '../components/Navbar/LoginNavbar';
import Footer from '../components/Footer/Footer';
import LoginForm from '../components/Login/LoginForm';

const Login = props => {
  return (
    <>
      <LoginNavbar />
      <div className="wrapper-full-page">
        <LoginForm />
        <Footer />
      </div>
    </>
  )
}

export default Login;