import React, { useContext, useEffect, useState } from 'react';
import { ScrollContext } from '../../Components/ScrollProvider';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FaUser, FaHeart } from 'react-icons/fa';
import { BsHandbag, BsBagFill } from 'react-icons/bs';
import { HiOutlineMenuAlt2, HiMenu } from 'react-icons/hi';
import { useLogout } from '../../../hooks/useLogout';

import { UseAuthContext } from '../../../hooks/useAuthContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
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

  const location = useLocation();

  // Access the active path name from the location object
  const activePathName = location.pathname;
  // Split the path by "/"
  const pathParts = activePathName.split('/');

  // The relevant part is the second element in the array after the split
  const extractedPath = `/${pathParts[1]}`;

  useEffect(() => {
    if (extractedPath === '/my-profile') {
      setActiveLink(0);
    } else if (extractedPath === '/wishlist') {
      setActiveLink(1);
    } else if (extractedPath === '/your-bag') {
      setActiveLink(2);
    } else if (extractedPath === '/login') {
      setActiveLink(0);
    } else {
      setActiveLink(3);
    }
  });

  const handleChangeIcon = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
                  <FaUser className="nav__icon" onClick={handleChangeIcon} />
                ) : (
                  <AiOutlineUser
                    className="nav__icon"
                    onClick={handleChangeIcon}
                  />
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
            <FaUser className="nav__icon" onClick={handleChangeIcon} />
          ) : (
            <AiOutlineUser className="nav__icon" onClick={handleChangeIcon} />
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
              <FaHeart className="nav__icon" onClick={handleChangeIcon} />
            ) : (
              <AiOutlineHeart
                className="nav__icon"
                onClick={handleChangeIcon}
              />
            )}
          </Link>
          <Link className="nav-bar-icons" to="/your-bag" onClick={closeNavbar}>
            {activeLink === 2 ? (
              <BsBagFill className="nav__icon" onClick={handleChangeIcon} />
            ) : (
              <BsHandbag className="nav__icon" onClick={handleChangeIcon} />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarIcons;
