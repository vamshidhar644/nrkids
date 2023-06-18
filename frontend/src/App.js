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

function App() {
  const { user } = UseAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
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
            path="/shop-by-category/:categorypath"
            element={<Categories />}
          />
          <Route path="/:productparent/:product" element={<ProductPage />} />
        </Routes>
        <Footer />
        {/* </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;
