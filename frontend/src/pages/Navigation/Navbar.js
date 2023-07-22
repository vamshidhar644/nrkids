/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import OfferSection from './OfferSection';
import { UseAuthContext } from '../../hooks/useAuthContext';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { useLogout } from '../../hooks/useLogout';
import { HiOutlineMenuAlt2, HiMenu } from 'react-icons/hi';
import { ScrollContext } from '../Components/ScrollProvider';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = UseAuthContext();
  const handleClick = () => {
    logout();
  };
  const [isActive, setIsActive] = useState(false);
  const [disableScrolling, setDisableScrolling] = useState(false);
  const isAtFooter = useContext(ScrollContext);

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
        <ul id="nav-bar" className={`ul ${isActive ? 'active' : ''}`}>
          <li>
            <NavLink to="/new-arrivals" onClick={closeNavbar}>
              NEW ARRIVALS
            </NavLink>
          </li>
          <li className="dropdownn">
            <p className="m-0">SHOP BY CATEGORY</p>
            <ul className="dropdownn-menu shop w-100">
              <li className="nav-item">
                <NavLink
                  className="nav-item-a "
                  to="/birthday"
                  onClick={closeNavbar}
                >
                  Birthday
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/new-arrivals"
                  onClick={closeNavbar}
                >
                  New Arrivals
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/ethnic-wear"
                  onClick={closeNavbar}
                >
                  Ethnic wear
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/party-wear"
                  onClick={closeNavbar}
                >
                  Party wear
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/casual-wear"
                  onClick={closeNavbar}
                >
                  Casual wear
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a "
                  to="/mom-and-me"
                  onClick={closeNavbar}
                >
                  Mom & me
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/siblings-set"
                  onClick={closeNavbar}
                >
                  Siblings set
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/casual-wear" onClick={closeNavbar}>
              CASUAL WEAR
            </NavLink>
          </li>
          <li>
            <NavLink to="/mom-and-me" onClick={closeNavbar}>
              MOM & ME
            </NavLink>
          </li>
        </ul>

        <div
          // className="nav__section_2 d-flex w-100 justify-content-end"
          className={`nav__section_2 w-100 ${
            isAtFooter ? 'hidden' : 'visible'
          }`}
        >
          <div className="input-wrapper d-flex gap-2">
            <div className="mobile__nav_boxes">
              {isActive ? (
                <HiMenu
                  className="nav__icon"
                  id="ham-menu"
                  onClick={toggleNavbar}
                />
              ) : (
                <HiOutlineMenuAlt2
                  className="nav__icon"
                  id="ham-menu"
                  onClick={toggleNavbar}
                />
              )}
              {user ? (
                <div className="dropdownn">
                  <NavLink to={`/my-profile/${user._id}`} onClick={closeNavbar}>
                    <AiOutlineUser className="nav__icon" />
                  </NavLink>
                  <ul className="user__profile">
                    <li className="nav-item">
                      <NavLink
                        className="profile-d"
                        to={`/my-profile/${user._id}`}
                      >
                        Hello {user.firstName}
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink className="profile-d" onClick={handleClick}>
                        logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  className="nav-bar-icons"
                  to="/login"
                  onClick={closeNavbar}
                >
                  <AiOutlineUser className="nav__icon" />
                </Link>
              )}
            </div>
            <div className="navbar__logo" onClick={closeNavbar}>
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <img
                  style={{ width: '95%', height: '95%' }}
                  src={process.env.PUBLIC_URL + '/Assets/logo.png'}
                  alt=""
                />
              </Link>
            </div>
            <div className="mobile__nav_boxes d-flex gap-2">
              <Link
                className="nav-bar-icons"
                to="/wishlist"
                onClick={closeNavbar}
              >
                <AiOutlineHeart
                  className="nav__icon"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                />
              </Link>
              <Link
                className="nav-bar-icons"
                to="/your-bag"
                onClick={closeNavbar}
              >
                <BsHandbag
                  className="nav__icon"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
