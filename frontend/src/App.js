import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Categories from './pages/Category/Categories';
import ProductPage from './pages/Product/ProductPage';
import Wishlist from './pages/Wishlist/Wishlist';
import Bag from './pages/Bag/Bag';
import Footer from './pages/Footer/Footer';
import Nextpage from './pages/Footer/NextPage/Nextpage';
import Navbar from './pages/Navigation/Navbar';
import Searched from './pages/Searched/Searched';
import Login from './pages/Login/Login';

import { UseAuthContext } from './hooks/useAuthContext';
import { FetchSanity } from './helpers/FetchSanity';
import ProfileBody from './pages/Profile/ProfileBody';
import Checkout from './pages/Checkout/Checkout';
import Buynow from './pages/Checkout/Buynow';
import MobileVerify from './pages/Profile/MobileVerify';
import { ToastContainer } from 'react-toastify';
// import Login from './pages/Login/Login';

function App() {
  const { user } = UseAuthContext();
  const { fetchHero, Hero } = FetchSanity();
  const { fetchNewArrivals, NewArrivals } = FetchSanity();
  const { fetchCollections, Collections } = FetchSanity();
  const { fetchAllProducts, Products } = FetchSanity();

  useEffect(() => {
    fetchHero();
    fetchNewArrivals();
    fetchCollections();
    fetchAllProducts();
  }, [user]);

  // InactivityTimeout();

  return (
    <BrowserRouter basename="nrkids">
      {/* <Navigation /> */}
      <Navbar />
      {user ? null : <Login isOpen={false} />}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              Hero={Hero}
              NewArrivals={NewArrivals}
              Collections={Collections}
            />
          }
        />

        <Route path="/wishlist" element={<Wishlist Products={Products} />} />
        <Route path="/your-bag" element={<Bag Products={Products} />} />

        <Route
          path="/:categorypath"
          element={<Categories Products={Products} />}
        />
        <Route
          path="/:productparent/:product"
          element={<ProductPage Products={Products} />}
        />

        <Route path="nr-kids/:nextpage" element={<Nextpage />} />

        <Route
          path="/my-profile/:id"
          element={user ? <ProfileBody /> : <Login />}
        />

        <Route path="/search/:searched" element={<Searched />} />

        <Route
          path="/your-bag/check-out"
          element={<Checkout Products={Products} />}
        />

        <Route path="/check-out" element={<Buynow Products={Products} />} />

        <Route path="/phone-verify" element={<MobileVerify />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

// const handleInactivityTimeout = () => {
//   localStorage.removeItem('nkuser'); // Replace 'yourDataKey' with the actual key used in local storage
//   localStorage.removeItem('user'); // Replace 'yourDataKey' with the actual key used in local storage
//   console.log('Data removed from local storage due to inactivity.');
// };

// const InactivityTimeout = () => {
//   const inactivityTimeLimit = 10 * 60 * 1000; // 10 minutes in milliseconds
//   let inactivityTimer;

//   const resetInactivityTimer = () => {
//     clearTimeout(inactivityTimer);
//     inactivityTimer = setTimeout(handleInactivityTimeout, inactivityTimeLimit);
//   };

//   useEffect(() => {
//     const handleUserActivity = () => resetInactivityTimer();

//     document.addEventListener('mousemove', handleUserActivity);
//     document.addEventListener('keydown', handleUserActivity);
//     document.addEventListener('scroll', handleUserActivity);

//     return () => {
//       document.removeEventListener('mousemove', handleUserActivity);
//       document.removeEventListener('keydown', handleUserActivity);
//       document.removeEventListener('scroll', handleUserActivity);
//       clearTimeout(inactivityTimer);
//     };
//   }, []);
// };
