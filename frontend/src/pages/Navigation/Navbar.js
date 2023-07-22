/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import OfferSection from './OfferSection';
import NavbarItems from './NavbarItems';
import NavbarIcons from './NavbarIcons';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [disableScrolling, setDisableScrolling] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
    setDisableScrolling(!disableScrolling);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeNavbar = () => {
    setIsActive(false);
    setDisableScrolling(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const scrollingUp = prevScrollPos > currentScrollPos;
    setScrollingUp(scrollingUp);
    setPrevScrollPos(currentScrollPos);
    setIsAtTop(window.pageYOffset === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`${isAtTop ? '' : 'fixed'} ${
        scrollingUp ? 'scrollUp' : 'scrolldown'
      }`}
      style={{
        transition: 'transform .9s',
        position: isAtTop ? '' : 'fixed',
        zIndex: '999',
      }}
    >
      <OfferSection />
      <nav>
        <div className="main__logo">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <img src={process.env.PUBLIC_URL + '/Assets/logo.png'} alt="" />
          </Link>
        </div>
        <NavbarItems isActive={isActive} changeNavbar={closeNavbar} />
        <NavbarIcons
          isActive={isActive}
          changeNavbar={closeNavbar}
          changeToggle={toggleNavbar}
        />
      </nav>
    </header>
  );
};

export default Navbar;
