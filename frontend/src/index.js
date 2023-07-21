import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import { UserAuthContextProvider } from './context/UseAuthContext';
import { ScrollProvider } from './pages/Components/ScrollProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserAuthContextProvider>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </UserAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
