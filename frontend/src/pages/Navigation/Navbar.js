/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import OfferSection from './OfferSection';
import { UseAuthContext } from '../../hooks/useAuthContext';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = UseAuthContext();
  const handleClick = () => {
    logout();
  };
  const [isActive, setIsActive] = useState(false);
  const [disableScrolling, setDisableScrolling] = useState(false);

  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const toggleNavbar = () => {
    setIsActive(!isActive);
    setDisableScrolling(!disableScrolling);
  };

  const closeNavbar = () => {
    setIsActive(false);
    setDisableScrolling(false);
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

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the dynamic width and height based on the scroll position
  const containerSize = Math.max(140 - scrollPosition, 90);
  return (
    <header className={`${isFixed ? 'fixed position-fixed' : ' w-100'}`}>
      <OfferSection />
      <nav>
        <div className="main-logo">
          <i
            className={`fas ${isActive ? 'fa-times' : 'fa-bars'}`}
            id="ham-menu"
            onClick={toggleNavbar}
          ></i>
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            style={{
              width: `${containerSize}px`,
              height: `${containerSize}px`,
              transition: '1.2s',
            }}
          >
            <img src={process.env.PUBLIC_URL + '/Assets/logo.png'} alt="" />
          </Link>
        </div>
        <ul id="nav-bar" className={isActive ? 'active' : ''}>
          <i
            className={`fas ${isActive ? 'fa-times' : 'fa-bars'}`}
            style={{ width: '100%' }}
            id="ham-menu"
            onClick={toggleNavbar}
          ></i>
          <li>
            <NavLink to="/new-arrivals" onClick={closeNavbar}>
              NEW ARRIVALS
            </NavLink>
          </li>
          <li className="dropdownn">
            <p className="m-0" onClick={closeNavbar}>
              SHOP BY CATEGORY
            </p>
            <ul className="dropdownn-menu shop w-100">
              <li className="nav-item">
                <NavLink
                  className="nav-item-a "
                  to="/birthday"
                  onClick={moveTop}
                >
                  Birthday
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/new-arrivals"
                  onClick={moveTop}
                >
                  New Arrivals
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/ethnic-wear"
                  onClick={moveTop}
                >
                  Ethnic wear
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/party-wear"
                  onClick={moveTop}
                >
                  Party wear
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/casual-wear"
                  onClick={moveTop}
                >
                  Casual wear
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a "
                  to="/mom-and-me"
                  onClick={moveTop}
                >
                  Mom & me
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-item-a"
                  to="/siblings-set"
                  onClick={moveTop}
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

        <div className="nav__section_2 w-100 d-flex justify-content-end">
          {/* <SearchBar className="Search-Section" /> */}
          <div className="input-wrapper d-flex gap-2">
            {user ? (
              <div className="dropdownn">
                <AiOutlineUser />
                <ul className="dropdownn-menu user__profile">
                  <li className="nav-item">
                    <NavLink
                      className="profile-d"
                      to={`/my-profile/${user._id}`}
                    >
                      Hello {user.firstName}
                    </NavLink>
                    <hr className="m-0" />
                  </li>

                  <li className="nav-item">
                    <NavLink className="profile-d" onClick={handleClick}>
                      logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="nav-bar-icons " to="/login-or-signup">
                <AiOutlineUser />
              </Link>
            )}
            <Link className="nav-bar-icons" to="/wishlist">
              <AiOutlineHeart />
            </Link>
            <Link className="nav-bar-icons" to="/your-bag">
              <BsHandbag />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
