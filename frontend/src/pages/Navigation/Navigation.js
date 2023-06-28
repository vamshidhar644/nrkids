import React, { useEffect, useState } from 'react';
import './Desktop/Navigation.css';
import { Link } from 'react-router-dom';

import NavbarItems from './NavbarItems';
import SearchBar from './SearchBar';

import { useLogout } from '../../hooks/useLogout';
import { UseAuthContext } from '../../hooks/useAuthContext';

import { AiOutlineMenu, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { MdLogin } from 'react-icons/md';

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = UseAuthContext();

  const [closeOffer, setCloseOffer] = useState(false);

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
    <div className={`${isFixed ? 'fixed position-fixed w-100' : ''}`}>
      <div className="navigation-container bg-white p-0 py-0 px-2 ">
        <div className="navbar-nav d-flex flex-row">
          <div className="navbar-nav-section1">
            <div className="navbar-toggle" onClick={handleNavToggle}>
              <AiOutlineMenu />
            </div>
          </div>
          <NavbarItems
            navbarColor={Visibility}
            isNavOpen={isNavOpen}
            navTop={navtop}
            navHeight={navHeight}
            onClick={handleNavToggle}
          />

          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            className="logo"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            nrKids
          </Link>
          <div className="navbar-icon-section d-flex justify-content-end align-items-center w-100">
            <SearchBar className="Search-Section" />
            <div className="input-wrapper d-flex p-2">
              <Link className="nav-bar-icons" to="/favorites">
                <AiOutlineHeart />
              </Link>
              {user && (
                <Link className="nav-bar-icons">
                  <MdLogin onClick={handleClick} />
                </Link>
              )}
              {!user && (
                <Link to="/login" className="nav-bar-icons">
                  <AiOutlineUser />
                </Link>
              )}
              <Link className="nav-bar-icons" to="/your-bag">
                <BsHandbag />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!closeOffer && (
        <div className="offer-section">
          <p
            className="Close position-absolute"
            onClick={() => setCloseOffer(true)}
          >
            X
          </p>
        </div>
      )}
    </div>
  );
};

export default Navigation;
