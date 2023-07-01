import React from 'react';
import { UseAuthContext } from '../../hooks/useAuthContext';

const NotLoggedIn = () => {
  const { user } = UseAuthContext();
  if (user) {
    return <div>NotLoggedIn</div>;
  } else {
    window.location = '/login-or-signup';
  }
};

export default NotLoggedIn;
