import React, { useState } from 'react';
import './Signin.css';
import { useSignup } from '../../hooks/useSignup';
import Signup from './Signup';
import Signin from './Signin';

const ParentCard = () => {
  const [signuppage, setSignup] = useState(false);

  return (
    <div className="signin-container py-5">
      <div
        className={`container ${signuppage ? 'right-panel-active' : ''}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <Signup />
        </div>
        <div className="form-container log-in-container">
          <Signin />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account? Log In</p>
              <button className="ghost" onClick={() => setSignup(!signuppage)}>
                Log In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, There!</h1>
              <p>Don't have an account? Sign Up Free</p>
              <button className="ghost" onClick={() => setSignup(!signuppage)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentCard;
