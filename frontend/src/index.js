import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
// import { UserAuthContextProvider } from './context/UseAuthContext';
import { ScrollProvider } from './Components/ScrollProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDftye9g5_3VwsuRl3V_kfm57mPko1dFww',
  authDomain: 'nrkids-appearel.firebaseapp.com',
  projectId: 'nrkids-appearel',
  storageBucket: 'nrkids-appearel.appspot.com',
  messagingSenderId: '787926285392',
  appId: '1:787926285392:web:dcafed4ac85afb89c62555',
  measurementId: 'G-VRDVKPYM2Y',
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ScrollProvider>
        <App />
      </ScrollProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
