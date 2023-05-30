import React, { useEffect, useState } from 'react';
import '../Styles/Navigation.css';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import SearchBar from './SearchBar';

import { AiOutlineMenu } from 'react-icons/ai';
import NavbarItems from './NavbarItems';

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  defineElement(lottie.loadAnimation);

  const handleClick = () => {
    logout();
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [Visibility, setVisibility] = useState('hidden');
  // const [navbarFixed, setNavbarFixed] = useState('');
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
    <div className={`navigation-container ${isFixed ? 'fixed' : ''}`}>
      <div className="offer-section"></div>
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
            <Link className="login-section-icons" to="/favorites">
              <lord-icon
                trigger="hover"
                src="https://cdn.lordicon.com/iwaotjbp.json"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            {user && (
              <div className="login-user">
                <p className="user-firstname">Hello! {user.firstName}</p>
                <Link className="login-section-icons">
                  <lord-icon
                    onClick={handleClick}
                    src="https://cdn.lordicon.com/twopqjaj.json"
                    trigger="hover"
                    style={{ width: '45px', height: '45px' }}
                  />
                </Link>
              </div>
            )}
            {!user && (
              <div className="logout-user">
                <Link
                  to="/login"
                  style={{ textDecoration: 'none' }}
                  className="login-section-icons"
                >
                  <lord-icon
                    trigger="hover"
                    src="https://cdn.lordicon.com/ajkxzzfb.json"
                    style={{ width: '45px', height: '45px' }}
                  />
                </Link>
              </div>
            )}
            <Link className="login-section-icons" to="/your-bag">
              <lord-icon
                src="https://cdn.lordicon.com/rmzhcgbh.json"
                trigger="hover"
                style={{ width: '40px', height: '40px' }}
              />
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
  );
};

export default Navigation;
