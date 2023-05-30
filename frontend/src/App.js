import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navigation from './Components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';

import Banners from './pages/Banners';
import NewArrivals from './pages/NewArrivals';
import Categories from './pages/Categories';

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navigation />
        {/* <NavbarItems/> */}
        {/* <div className="pages"> */}
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

          <Route path="/:bannerpath" element={<Banners />} />
          <Route
            path="/new-arrivals/:newarrivalpath"
            element={<NewArrivals />}
          />
          <Route path="/categories/:categorypath" element={<Categories />} />
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;
