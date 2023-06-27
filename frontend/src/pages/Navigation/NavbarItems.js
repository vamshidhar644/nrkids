import React from 'react';
import { NavLink } from 'react-router-dom';
// import { AiFillCloseSquare } from 'react-icons/ai';
import 'bootstrap';

const NavbarItems = (props) => {
  return (
    <ul className="navbar-links d-flex p-0 m-0">
      {/* <li className={`cross-btn ${props.isNavOpen ? 'Close-navbar' : ''}`}>
        <AiFillCloseSquare onClick={props.onClick} className="cursor-pointer" />
      </li> */}
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink to={`/new-arrivals`}>NEW ARRIVALS</NavLink>
      </li>
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink>SHOP BY CATEGORY</NavLink>
        <ul className="down-dropdown position-fixed bg-white">
          <li className="nav-item">
            <NavLink className="nav-item-a " to="/birthday">
              Birthday
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/new-arrivals">
              New Arrivals
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/ethnic-wear">
              Ethnic wear
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/party-wear">
              Party wear
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/casual-wear">
              Casual wear
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a " to="/mom-and-me">
              Mom & me
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/siblings-set">
              Siblings set
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink to="/casual-wear">CASUAL WEAR</NavLink>
      </li>
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink to="/mom-and-me">MOM & ME</NavLink>
      </li>
    </ul>
  );
};

export default NavbarItems;
