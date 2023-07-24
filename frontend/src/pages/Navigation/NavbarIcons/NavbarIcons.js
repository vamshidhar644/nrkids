import React, { useContext, useEffect, useState } from 'react';
import { ScrollContext } from '../../Components/ScrollProvider';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FaUser, FaHeart } from 'react-icons/fa';
import { BsHandbag, BsHandbagFill } from 'react-icons/bs';
import { HiOutlineMenuAlt2, HiMenu } from 'react-icons/hi';
import { useLogout } from '../../../hooks/useLogout';

import { UseAuthContext } from '../../../hooks/useAuthContext';
import { Link, NavLink } from 'react-router-dom';
import { FetchMongo } from '../../../helpers/FetchMongo';

const NavbarIcons = ({ isActive, changeNavbar, changeToggle }) => {
  const { user } = UseAuthContext();
  const { fetchUserData, userData } = FetchMongo();
  const isAtFooter = useContext(ScrollContext);

  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const closeNavbar = () => {
    changeNavbar();
  };

  const toggleNavbar = () => {
    changeToggle();
    
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const [activeLink, setActiveLink] = useState();
  useEffect(() => {
    // Get the current URL path using window.location
    const currentPath = window.location.pathname;

    // Find the index of "/nrkids/"
    const index = currentPath.indexOf('/nrkids/');

    // If "/nrkids/" is found, extract the part after it
    let pathAfterNrKids = '';
    if (index !== -1) {
      pathAfterNrKids = currentPath.slice(index + 8);
      // Split the pathAfterNrKids by '/', and get the first part (word after "/nrkids/")
      pathAfterNrKids = pathAfterNrKids.split('/')[0];
    }

    if (pathAfterNrKids === 'my-profile') {
      setActiveLink(0);
    } else if (pathAfterNrKids === 'wishlist') {
      setActiveLink(1);
    } else if (pathAfterNrKids === 'your-bag') {
      setActiveLink(2);
    } else if (pathAfterNrKids === 'login') {
      setActiveLink(0);
    } else {
      setActiveLink(3);
    }
  }, [window.location.pathname]);

  return (
    <div className={`nav__section_2 ${isAtFooter ? 'hidden' : 'visible'}`}>
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
                {activeLink === 0 ? (
                  <FaUser className="nav__icon" />
                ) : (
                  <AiOutlineUser className="nav__icon" />
                )}
              </NavLink>
              <ul className="user__profile">
                <li className="nav-item">
                  <NavLink className="profile-d" to={`/my-profile/${user._id}`}>
                    Hello {userData && userData.firstName}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="profile-d" onClick={handleClick}>
                    logout
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : activeLink === 0 ? (
            <FaUser className="nav__icon" />
          ) : (
            <AiOutlineUser className="nav__icon" />
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
          <Link className="nav-bar-icons" to="/wishlist" onClick={closeNavbar}>
            {activeLink === 1 ? (
              <FaHeart
                className="nav__icon"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              />
            ) : (
              <AiOutlineHeart
                className="nav__icon"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              />
            )}
          </Link>
          <Link className="nav-bar-icons" to="/your-bag" onClick={closeNavbar}>
            {activeLink === 2 ? (
              <BsHandbagFill
                className="nav__icon"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              />
            ) : (
              <BsHandbag
                className="nav__icon"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarIcons;
