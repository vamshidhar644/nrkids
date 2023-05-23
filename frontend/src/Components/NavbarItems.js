import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillCloseSquare } from 'react-icons/ai';

const NavbarItems = (props) => {
  return (
    <nav
      className={`navbar ${props.isNavOpen ? 'navbar-open' : ''}`}
      style={{ padding: '0px', visibility: props.isNavOpen }}
    >
      <ul className={`navbar-links ${props.isNavOpen ? 'open' : ''}`}>
        {/* <li className={`${props.isNavOpen ? 'Close-navbar' : ''}`}>
            <AiFillCloseSquare/>
        </li> */}
        <li className="navbar-link">
          <NavLink to="/">HOME</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/new-arrivals">NEW ARRIVALS</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/sample-sale">SAMPLE SALE</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink>SHOP BY CATEGORY</NavLink>
          <ul className="down-dropdown">
            <li className="nav-item-a">
              <NavLink to="/first-birthday">First Birthday</NavLink>
            </li>
            <li className="nav-item-a">
              <NavLink to="/new-arrivals">New Arrivals</NavLink>
            </li>
            <li className="nav-item-a">
              <NavLink to="/ethnic-wear">Ethnic wear</NavLink>
            </li>
            <li className="nav-item-a">
              <NavLink to="party-wear">Party wear</NavLink>
            </li>
            <li className="nav-item-a">
              <NavLink to="/gowns">Gowns</NavLink>
            </li>
            <li className="nav-item-a">
              <NavLink to="/dresses">Dresses</NavLink>
            </li>
            <li className="nav-item-a">
              <NavLink to="/accessories">Accessories</NavLink>
            </li>
          </ul>
        </li>
        <li className="navbar-link">
          <NavLink to="/teens">TEENS</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/events">GOWNS</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/accessories">ACCESSORIES</NavLink>
        </li>

        <li className="navbar-link">
          <NavLink>DRESSES</NavLink>
          <ul className="down-dropdown">
            <li>
              <NavLink to="/short-dresses" className="nav-item-a">
                Short dresses
              </NavLink>
            </li>
            <li>
              <NavLink to="/high-low-dresses" className="nav-item-a">
                High low dresses
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="navbar-link">
          <NavLink to="/best-sellers">BEST SELLERS</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarItems;
