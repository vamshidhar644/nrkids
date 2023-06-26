import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Home from './pages/Home/Home';
import Categories from './pages/Category/Categories';
import ProductPage from './pages/Product/ProductPage';
import Favorites from './pages/Favorites/Favorites';
import Bag from './pages/Bag/Bag';
import Footer from './pages/Footer/Footer';

import Navigation from './pages/Navigation/Navigation';

import { UseAuthContext } from './hooks/useAuthContext';
import { FetchSanity } from './BackOps/FetchSanity';
import Nextpage from './pages/Footer/NextPage/Nextpage';

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
  }, []);
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
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/your-bag" element={<Bag />} />

        <Route
          path="/:categorypath"
          element={<Categories Products={Products} />}
        />
        <Route
          path="/:productparent/:product"
          element={<ProductPage Products={Products} />}
        />

        <Route path="nr-kids/:nextpage" element={<Nextpage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
