import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useSign } from '../../hooks/useSign';
import { UseAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import './Login.css';

const Login = ({ isOpen }) => {
  const { user } = UseAuthContext();
  const { signup, signerror } = useSign();
  const navigate = useNavigate();

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear() % 100;
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const handleGoogle = () => {
    // handleSignIn();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;

        const _id = `NKUID${date}${month}${year}${hours}${minutes}${seconds}`;

        const newName = user.displayName;
        const namesArray = newName.split(' ');

        const firstName = namesArray[0];
        const lastName = namesArray.slice(1).join(' ');
        const email = user.email;
        const password = user.uid;
        const displayPic = user.photoURL;

        signup(_id, firstName, lastName, email, password, displayPic);
      })
      .catch((error) => {
        // Handle sign-in error
        console.error('Error signing in:', error);
      });

    if (signerror) {
      alert(signerror);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [closedPopup, setClosedPopup] = useState(isOpen);
  useEffect(() => {
    // Check if the user variable is null on the first refresh
    if (!closedPopup) {
      setShowPopup(true);
    }

    // Reopen the popup after 20 seconds if it's closed
    if (closedPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setClosedPopup(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [user, closedPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setClosedPopup(true);
    navigate('/');
  };

  if (user) {
    return null;
  }

  return showPopup ? (
    <div className="popup">
      <div className=" popup-content p-0">
        <div className="loginCard p-4 position-relative">
          <div className="loginHeading logo__container">
            <img
              src={process.env.PUBLIC_URL + '/Assets/logo2.jpg'}
              alt=""
              className="w-100"
            />
          </div>
          <p className="loginDescription">
            To proceed with shopping, please continue using Google.
          </p>

          <button onClick={handleGoogle} className="acceptButton">
            Continue with <FcGoogle />
          </button>
          <div onClick={handleClosePopup} className="login__close">
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
