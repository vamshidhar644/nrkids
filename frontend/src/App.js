
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navigation from './Components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';

function App() {
  const { user } = useAuthContext()
  return (
    <>
    <BrowserRouter>
        <Navigation/> 
        {/* <NavbarItems/> */}
    {/* <div className="pages"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/'/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/your-bag' element={<Cart/>}/>
          </Routes> 
        {/* </div> */}
    </BrowserRouter>
    </>
  );
}

export default App;
