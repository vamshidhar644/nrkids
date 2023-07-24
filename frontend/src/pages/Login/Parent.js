import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useSignup } from '../../hooks/useSignup';

const Parent = () => {
  const { signup, signerror } = useSignup();

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
  };
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={handleGoogle}>Continue with Google</button>
      {/* <SignInWithGoogle />
      <SignUpWithGoogle /> */}
    </div>
  );
};

export default Parent;
