import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export const auth = firebase.auth;
export const firestore = firebase.firestore;
