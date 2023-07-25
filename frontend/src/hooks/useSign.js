import { useState } from 'react';
import { UseAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useSign = () => {
  const [signerror, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  // const BACKEND_URL = 'http://localhost:4000';

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
      toast.error(`${json.error}`, {
        position: 'bottom-center',
        autoClose: 2000, // 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (response.ok) {
      // console.log(JSON.stringify(json));
      // save the user to local storage
      localStorage.setItem('nkuser', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
      toast.success('Successfully Logged in!', {
        position: 'bottom-center',
        autoClose: 2000, // 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return { signup, isLoading, signerror };
};
