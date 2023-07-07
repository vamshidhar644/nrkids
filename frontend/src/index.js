import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import { UserAuthContextProvider } from './context/UseAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
