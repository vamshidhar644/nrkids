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
import Navbar from './pages/Navigation/Navbar';

import { UseAuthContext } from './hooks/useAuthContext';
import { FetchSanity } from './BackOps/FetchSanity';
import { FetchMongo } from './BackOps/FetchMongo';
import ProfileBody from './pages/Profile/ProfileBody';
import Checkout from './pages/Checkout/Checkout';
import Buynow from './pages/Checkout/Buynow';
import MobileVerify from './pages/Profile/MobileVerify';
import Login from './pages/Login/Login';

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

  return (
    <BrowserRouter basename="nrkids">
      {/* <Navigation /> */}
      <Navbar />
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
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/wishlist"
          element={
            user ? <Wishlist Products={Products} /> : <Login from="wishlist" />
          }
        />
        <Route
          path="/your-bag"
          element={user ? <Bag Products={Products} /> : <Login from="cart" />}
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
          element={user ? <ProfileBody /> : <Login />}
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
