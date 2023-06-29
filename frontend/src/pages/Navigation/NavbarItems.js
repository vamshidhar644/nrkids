import React from 'react';
import { NavLink } from 'react-router-dom';
// import { AiFillCloseSquare } from 'react-icons/ai';
import 'bootstrap';

const NavbarItems = (props) => {
  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <ul className="navbar-links d-flex p-0 m-0">
      {/* <li className={`cross-btn ${props.isNavOpen ? 'Close-navbar' : ''}`}>
        <AiFillCloseSquare onClick={props.onClick} className="cursor-pointer" />
      </li> */}
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink to={`/new-arrivals`} onClick={moveTop}>
          NEW ARRIVALS
        </NavLink>
      </li>
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink>SHOP BY CATEGORY</NavLink>
        <ul className="cat-list down-dropdown position-fixed bg-white">
          <li className="nav-item">
            <NavLink className="nav-item-a " to="/birthday" onClick={moveTop}>
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
            <NavLink className="nav-item-a" to="/ethnic-wear" onClick={moveTop}>
              Ethnic wear
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/party-wear" onClick={moveTop}>
              Party wear
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a" to="/casual-wear" onClick={moveTop}>
              Casual wear
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item-a " to="/mom-and-me" onClick={moveTop}>
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
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink to="/casual-wear" onClick={moveTop}>
          CASUAL WEAR
        </NavLink>
      </li>
      <li className="navbar-link d-flex justify-content-center align-items-center small p-2">
        <NavLink to="/mom-and-me" onClick={moveTop}>
          MOM & ME
        </NavLink>
      </li>
    </ul>
  );
};

export default NavbarItems;
