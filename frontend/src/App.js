import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Categories from './pages/Category/Categories';
import ProductPage from './pages/Product/ProductPage';
import Favorites from './pages/Favorites/Favorites';
import Bag from './pages/Bag/Bag';
import Footer from './pages/Footer/Footer';
import Nextpage from './pages/Footer/NextPage/Nextpage';
import Navigation from './pages/Navigation/Navigation';

import { UseAuthContext } from './hooks/useAuthContext';
import { FetchSanity } from './BackOps/FetchSanity';
import { FetchMongo } from './BackOps/FetchMongo';
import ProfileBody from './pages/Profile/ProfileBody';
import Signin from './pages/Google/Signup';
import ParentCard from './pages/Google/ParentCard';
import NotLoggedIn from './pages/UnAuth/NotLoggedIn';

function App() {
  const { user } = UseAuthContext();
  const { fetchHero, Hero } = FetchSanity();
  const { fetchNewArrivals, NewArrivals } = FetchSanity();
  const { fetchCollections, Collections } = FetchSanity();
  const { fetchAllProducts, Products } = FetchSanity();

  const { fetchcartData, fetchUserData, cartItems, userData } = FetchMongo();

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
          element={!user ? <ParentCard /> : <Navigate to="/" />}
        />

        <Route path="/favorites" element={<Favorites />} />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
