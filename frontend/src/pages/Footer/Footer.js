import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="Parent-Footer small">
      <div className="box box1">
        <b>Shop by Category</b>
        <hr />
        <div className="Footer-links">
          <Link to="/birthday">First Birthday</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
          <Link to="/ethnic-wear">Ethnic Wear</Link>
          <Link to="/party-wear">Party Wear</Link>
          <Link to="/mom-and-me">Mom & me</Link>
          <Link to="/casual-wear">Casual wear</Link>
          <Link to="/siblings-set">Siblings set</Link>
        </div>
      </div>

      <div className="box box2">
        <div>
          <b>About</b>
          <hr />
          <div className="Footer-links">
            <Link to={`nr-kids/contact-us`}>Contact Us</Link>
            <Link to={`nr-kids/about-us`}>About Us</Link>
          </div>
        </div>
        <div>
          <b>Policy</b>
          <hr />
          <div className="Footer-links">
            <Link to={`nr-kids/return-policy`}>Return Policy</Link>
            <Link to={`nr-kids/Terms-and-conditions`}>Terms & Condition</Link>
            <Link to={`nr-kids/security-and-privacy`}>Security & Privacy</Link>
          </div>
        </div>
      </div>

      <div className="box box3">
        <div className="social-icons">
          <Link>
            <AiFillInstagram className="social-icon" />
          </Link>
          <Link>
            <FaFacebookF className="social-icon" />
          </Link>
          <Link>
            <AiOutlineTwitter className="social-icon" />
          </Link>
        </div>
        <p className="address">
          <GoLocation /> Bangalore
        </p>
        <p>© 2023 | NRKids All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
