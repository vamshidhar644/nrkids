import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillCloseSquare } from 'react-icons/ai';

const NavbarItems = (props) => {
  return (
    <nav
      className={`navbar ${props.isNavOpen ? 'navbar-open' : ''}`}
      style={{ padding: '0px', visibility: props.isNavOpen }}
    >
      <ul
        className={`navbar-links ${props.isNavOpen ? 'open' : ''}`}
        style={{ height: props.navHeight }}
      >
        <li className={`cross-btn ${props.isNavOpen ? 'Close-navbar' : ''}`}>
          <AiFillCloseSquare onClick={props.onClick} className="cross-icon" />
        </li>
        <li className="navbar-link">
          <NavLink to="/">HOME</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to={`/shop-by-category/new-arrivals`}>NEW ARRIVALS</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/sample-sale">SAMPLE SALE</NavLink>
        </li>
        <li className="navbar-link ">
          <NavLink>SHOP BY CATEGORY</NavLink>
          <ul className="down-dropdown">
            <li className="nav-item">
              <NavLink
                className="nav-item-a"
                to={`/shop-by-category/first-birthday`}
              >
                First Birthday
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-item-a"
                to="/shop-by-category/new-arrivals"
              >
                New Arrivals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-item-a"
                to="/shop-by-category/ethnic-wear"
              >
                Ethnic wear
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-item-a"
                to={`/shop-by-category/party-wear`}
              >
                Party wear
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item-a" to="/shop-by-category/gowns">
                Gowns
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item-a" to="/shop-by-category/dresses">
                Dresses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-item-a"
                to="/shop-by-category/accessories"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="navbar-link">
          <NavLink to="/teens">TEENS</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/gowns">GOWNS</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/accessories">ACCESSORIES</NavLink>
        </li>

        <li className="navbar-link">
          <NavLink>DRESSES</NavLink>
          <ul className="down-dropdown">
            <li className="nav-item">
              <NavLink className="nav-item-a" to="/short-dresses">
                Short dresses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item-a" to="/high-low-dresses">
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
