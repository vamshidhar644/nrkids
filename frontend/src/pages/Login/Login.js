import React, { useState } from 'react';
import './Login.css';
import { useSignup } from '../../hooks/useSignup';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { useLogin } from '../../hooks/useLogin';

const Login = ({ from }) => {
  const { signup, signerror } = useSignup();
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear() % 100;
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const handleGoogleSignup = async () => {
    signInWithPopup(auth, provider).then((data) => {
      const newName = data.user.displayName;
      // Split the display name into first name and last name
      const namesArray = newName.split(' ');

      const _id = `NKUID${date}${month}${year}${hours}${minutes}${seconds}`;
      const firstName = namesArray[0];
      const lastName = namesArray.slice(1).join(' ');
      const email = data.user.email;
      const password = data.user.uid;
      const displayPic = data.user.photoURL;
      signup(_id, firstName, lastName, email, password, displayPic);
    });
  };

  const [login_email, setLoginEmail] = useState('');
  const [login_password, setLoginPassword] = useState('');
  const { login, loginerror } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = login_email;
    const password = login_password;

    await login(email, password);
  };

  return (
    <div className="Login__Parent py-5">
      {from && (
        <h4 style={{ marginBlockStart: '1em', marginTop: '0px' }}>
          Please login to see your {from}
        </h4>
      )}
      <div className="form__container">
        <p className="title">Login</p>
        <form className="form">
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setLoginEmail(e.target.value)}
              value={login_email}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
              value={login_password}
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>
          <button className="signin" onClick={handleLogin}>
            Sign in
          </button>
          {loginerror ? <p>{loginerror}</p> : <p></p>}
        </form>
        <p className="signup m-0 pt-2">Don't have an account?</p>
        <p className="google__signup" onClick={handleGoogleSignup}>
          Signup with&nbsp;&nbsp;
          <FcGoogle className="google-icon" />
        </p>
        {signerror ? <p className="m-0">{signerror}</p> : <p></p>}
      </div>
    </div>
  );
};

export default Login;
