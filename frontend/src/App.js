import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navigation from './Components/NavigationBar/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UseAuthContext } from './hooks/useAuthContext';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';

import Categories from './pages/Categories';
import ProductPage from './pages/ProductPage';
import Footer from './Components/Footer/Footer';

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
          <Route path="/your-bag" element={<Cart />} />

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
