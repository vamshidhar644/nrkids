import React, { useState } from 'react';
import './Login.css';
import { useSignup } from '../../hooks/useSignup';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const { signup, signerror } = useSignup();
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDate
    .getMilliseconds()
    .toString()
    .padStart(3, '0');

  const handleGoogleSignup = async () => {
    signInWithPopup(auth, provider).then((data) => {
      // setUser(data.user);

      const newName = data.user.displayName;
      // Split the display name into first name and last name
      const namesArray = newName.split(' ');

      const _id = `NKUID${hours}${minutes}${seconds}${milliseconds}`;
      const firstName = namesArray[0];
      const lastName = namesArray.slice(1).join(' ');
      const email = data.user.email;
      const password = data.user.uid;
      const displayPic = data.user.photoURL;

      signup(_id, firstName, lastName, email, password, displayPic);
      localStorage.setItem('email', data.user.email);
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
    <div className="Login__Parent">
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
