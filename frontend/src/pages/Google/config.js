// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDftye9g5_3VwsuRl3V_kfm57mPko1dFww',
  authDomain: 'nrkids-appearel.firebaseapp.com',
  projectId: 'nrkids-appearel',
  storageBucket: 'nrkids-appearel.appspot.com',
  messagingSenderId: '787926285392',
  appId: '1:787926285392:web:dcafed4ac85afb89c62555',
  measurementId: 'G-VRDVKPYM2Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
