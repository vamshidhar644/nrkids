import React, { useState } from 'react';
import './Signin.css';
import { useSignup } from '../../hooks/useSignup';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const [signup_firstName, setSignup_Firstname] = useState('');
  const [signup_lastName, setSignup_Lastname] = useState('');
  const [signup_email, setSignup_Email] = useState('');
  const [signup_password, setSignup_Password] = useState('');
  const { signup, signerror } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentDate
      .getMilliseconds()
      .toString()
      .padStart(3, '0');

    const _id = `NKUID${hours}${minutes}${seconds}${milliseconds}`;

    const firstName = signup_firstName;
    const lastName = signup_lastName;
    const email = signup_email;
    const password = signup_password;

    await signup(_id, firstName, lastName, email, password);
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
      <div className="p-2 d-flex text-nowrap gap-3">
        <button onClick={handleSignup}>Sign Up</button>
        <button>
          Signup with <FcGoogle className="google-icon" />
        </button>
      </div>
      <p className="error-p m-0">{signerror ? signerror : ''}</p>
    </form>
  );
};

export default Signup;
