import { useState } from 'react';
import { UseAuthContext } from './useAuthContext';
import { useLogin } from './useLogin';

export const useSignup = () => {
  const [signerror, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const { login } = useLogin();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const signup = async (
    _id,
    firstName,
    lastName,
    email,
    password,
    displayPic
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        _id,
        firstName,
        lastName,
        email,
        password,
        displayPic,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError('*' + json.error);

      if (json.error === '0') {
        console.log('to login=>');
        login(email);
      }
    }
    if (response.ok) {
      // console.log(JSON.stringify(json));
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // setIsLoading(false);
    }
  };
  return { signup, isLoading, signerror };
};
