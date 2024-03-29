import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Categories from './pages/Category/Categories';
import ProductPage from './pages/Product/ProductPage';
import Wishlist from './pages/Wishlist/Wishlist';
import Bag from './pages/Bag/Bag';
import Footer from './pages/Footer/Footer';
import Next from './pages/Footer/NextPage/Next';
import Navbar from './pages/Navigation/Navbar';
import Login from './pages/Login/Login';
import ProfileBody from './pages/Profile/ProfileBody';
import Checkout from './pages/Checkout/Checkout';
import Buynow from './pages/Checkout/Buynow';
import MobileVerify from './pages/ConfirmOrder/MobileVerify';

import { UseAuthContext } from './hooks/useAuthContext';
import { FetchSanity } from './helpers/FetchSanity';
import { ToastContainer } from 'react-toastify';
import InactiveTimerComponent from './InactivivityTImer';

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

        <Route path="nrkids/:nextpage" element={<Next />} />

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
      {user && <InactiveTimerComponent />}
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
