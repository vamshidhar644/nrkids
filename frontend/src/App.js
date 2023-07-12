import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Categories from './pages/Category/Categories';
import ProductPage from './pages/Product/ProductPage';
import Wishlist from './pages/Wishlist/Wishlist';
import Bag from './pages/Bag/Bag';
import Footer from './pages/Footer/Footer';
import Nextpage from './pages/Footer/NextPage/Nextpage';
import Navigation from './pages/Navigation/Navigation';
import ParentLogin from './pages/Login/ParentLogin';

import { UseAuthContext } from './hooks/useAuthContext';
import { FetchSanity } from './BackOps/FetchSanity';
import { FetchMongo } from './BackOps/FetchMongo';
import ProfileBody from './pages/Profile/ProfileBody';
import Checkout from './pages/Checkout/Checkout';
import Buynow from './pages/Checkout/Buynow';
import MobileVerify from './pages/Profile/MobileVerify';
import { UserAuthContextProvider } from './context/UseAuthContext';

function App() {
  const { user } = UseAuthContext();
  const { User } = UserAuthContextProvider;
  const { fetchHero, Hero } = FetchSanity();
  const { fetchNewArrivals, NewArrivals } = FetchSanity();
  const { fetchCollections, Collections } = FetchSanity();
  const { fetchAllProducts, Products } = FetchSanity();

  const {
    fetchcartData,
    fetchUserData,
    fetchWishlist,
    cartItems,
    userData,
    wishlist,
  } = FetchMongo();

  useEffect(() => {
    fetchHero();
    fetchNewArrivals();
    fetchCollections();
    fetchAllProducts();
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchcartData();
      fetchUserData();
      fetchWishlist();
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navigation />
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
        <Route
          path="/login-or-signup"
          element={!user ? <ParentLogin /> : <Navigate to="/" />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} Products={Products} />}
        />
        <Route
          path="/your-bag"
          element={<Bag cartItems={cartItems} Products={Products} />}
        />

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
          element={<ProfileBody userData={userData} />}
        />

        <Route
          path="/your-bag/check-out"
          element={<Checkout Products={Products} />} 
        />

        <Route path="/check-out" element={<Buynow Products={Products} />} />

        <Route path="/phone-verify" element={<MobileVerify />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
