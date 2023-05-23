import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Login.css';
import { useLogin } from '../hooks/useLogin';

const LoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="Login-Container">
      <div className="login-card">
        <div className="login">Login</div>
        <div className="inputBox">
          <input
            type="text"
            required="required"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Email</span>
        </div>

        <div className="inputBox">
          <input
            type="password"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span>Password</span>
          <p className="inner-logcard-text">Forgot Password?</p>
        </div>
        {error && <div classNameName="error">{error}!!</div>}

        <button className="enter" onClick={handleSubmit} disabled={isLoading}>
          Login
        </button>
        <Link
          to="/signup"
          className="inner-logcard-text"
          style={{ textDecoration: 'none' }}
        >
          Don't have an accout? <span>Create one</span>
        </Link>
      </div>
      {/* <img
        src="../../../Assets/login-bg.jpg"
        width={400}
        className="login-bg"
        alt=''
      /> */}
    </div>
  );
};

export default LoginSection;
