import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../../../hooks/useLogout';

const NavbarItems = ({ isActive, changeNavbar }) => {
  const closeNavbar = () => {
    changeNavbar();
  };

  const { logout } = useLogout();
  const handlelogout = () => {
    logout();
  };
  return (
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
      <li className="mobile__logout" onClick={handlelogout}>
        <p className='m-0'>LOGOUT</p>
      </li>
    </ul>
  );
};

export default NavbarItems;
