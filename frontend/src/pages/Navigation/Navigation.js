import React, { useEffect, useState } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

import NavbarItems from './NavbarItems';
import SearchBar from './SearchBar';

import { useLogout } from '../../hooks/useLogout';
import { UseAuthContext } from '../../hooks/useAuthContext';

import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdOutlineFavorite, MdLogin, MdShoppingBag } from 'react-icons/md';

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = UseAuthContext();

  const handleClick = () => {
    logout();
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [Visibility, setVisibility] = useState('hidden');
  const [navHeight, setHeight] = useState('');
  const [navtop, setNavtop] = useState('');

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
    setVisibility(isNavOpen ? 'visible' : 'hidden');
    setNavtop(isFixed ? '83.729px' : '');
    setHeight(isNavOpen ? '' : '100vh');
  };

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsFixed(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="offer-section"></div>
      <div className={`navigation-container  ${isFixed ? 'fixed' : ''}`}>
        <div className="navbar-nav">
          <div className="navbar-nav-section1">
            <div className="navbar-toggle" onClick={handleNavToggle}>
              <AiOutlineMenu />
            </div>
          </div>
          <div className="navbar-nav-section2">
            <Link
              to="/"
              style={{ textDecoration: 'none' }}
              className="Brand-logo"
            >
              nrKids
            </Link>
          </div>
          <div className="navbar-nav-section3">
            <SearchBar className="Search-Section" />
            <div className="input-wrapper">
              <Link className="nav-bar-icons" to="/favorites">
                <MdOutlineFavorite />
              </Link>
              {user && (
                <Link className="nav-bar-icons">
                  <FaUser onClick={handleClick} />
                </Link>
              )}
              {!user && (
                <Link to="/login" className="nav-bar-icons">
                  <MdLogin />
                </Link>
              )}
              <Link className="nav-bar-icons" to="/your-bag">
                <MdShoppingBag />
              </Link>
            </div>
          </div>
        </div>
        <NavbarItems
          navbarColor={Visibility}
          isNavOpen={isNavOpen}
          navTop={navtop}
          navHeight={navHeight}
          onClick={handleNavToggle}
        />
      </div>
    </div>
  );
};

export default Navigation;
