import React, { useState } from 'react';
import './Signin.css';
import { useSignup } from '../../hooks/useSignup';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';

const Signup = () => {
  const [signup_firstName, setSignup_Firstname] = useState('');
  const [signup_lastName, setSignup_Lastname] = useState('');
  const [signup_email, setSignup_Email] = useState('');
  const [signup_password, setSignup_Password] = useState('');
  const [signup_confirmpassword, setSignup_ConfirmPassword] = useState('');
  const { signup, signerror } = useSignup();

  const [user, setUser] = useState();

  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDate
    .getMilliseconds()
    .toString()
    .padStart(3, '0');
  const _id = `NKUID${hours}${minutes}${seconds}${milliseconds}`;

  const handleSignup = async (e) => {
    e.preventDefault();

    const firstName = signup_firstName;
    const lastName = signup_lastName;
    const email = signup_email;
    const password = signup_password;

    await signup(_id, firstName, lastName, email, password);
  };

  const handleGoogleSignup = async () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);

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

  return (
    <form action="#">
      <h3>Create Account</h3>
      <div className="d-flex gap-2">
        <input
          type="text"
          placeholder="Firstname"
          required="required"
          onChange={(e) => setSignup_Firstname(e.target.value)}
          value={signup_firstName}
        />
        <input
          type="text"
          placeholder="Lastname"
          required="required"
          onChange={(e) => setSignup_Lastname(e.target.value)}
          value={signup_lastName}
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        required="required"
        onChange={(e) => setSignup_Email(e.target.value)}
        value={signup_email}
      />
      <input
        type="password"
        placeholder="Password"
        required="required"
        onChange={(e) => setSignup_Password(e.target.value)}
        value={signup_password}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        required="required"
        onChange={(e) => setSignup_ConfirmPassword(e.target.value)}
        value={signup_confirmpassword}
      />
      <div className="p-2 d-flex text-nowrap gap-3 align-items-center">
        <button onClick={handleSignup}>Sign Up</button>
        <p
          className="d-flex m-0 google-login h-100 align-items-center px-4"
          onClick={handleGoogleSignup}
        >
          Signup with&nbsp;
          <FcGoogle className="google-icon" />
        </p>
      </div>
      <p className="error-p m-0">{signerror ? signerror : ''}</p>
    </form>
  );
};

export default Signup;
