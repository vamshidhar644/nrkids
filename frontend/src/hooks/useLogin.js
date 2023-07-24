import { useState } from 'react';
import { UseAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [loginerror, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const login = async (email) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // setIsLoading(false);
    }
  };
  return { login, isLoading, loginerror };
};
