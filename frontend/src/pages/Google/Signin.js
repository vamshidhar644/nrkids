import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from '../../hooks/useLogin';

const Signin = () => {
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
    <form action="#">
      <h1>Log in</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setLoginEmail(e.target.value)}
        value={login_email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setLoginPassword(e.target.value)}
        value={login_password}
      />
      <p className="m-0 w-100">Forgot your password?</p>
      <div className="p-2 d-flex text-nowrap gap-3">
        <button onClick={handleLogin}>Log In</button>
        <p className="d-flex m-0 google-login h-100 align-items-center px-4">
          Login with &nbsp;
          <FcGoogle className="google-icon" />
        </p>
      </div>
      <p className="error-p m-0">{loginerror ? loginerror : ''}</p>
    </form>
  );
};

export default Signin;
