import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { BiLinkAlt } from 'react-icons/bi';
import './Footer.css';

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer id="footer">
      <div className="Parent-Footer">
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
              <Link to={`nr-kids/contact-us`} onClick={handleClick}>
                Contact Us
              </Link>
              <Link to={`nr-kids/about-us`} onClick={handleClick}>
                About Us
              </Link>
            </div>
          </div>
          <div>
            <b>Policy</b>
            <hr />
            <div className="Footer-links">
              <Link to={`nr-kids/return-policy`} onClick={handleClick}>
                Return Policy
              </Link>
              <Link to={`nr-kids/Terms-and-conditions`} onClick={handleClick}>
                Terms & Condition
              </Link>
            </div>
          </div>
        </div>

        <hr className="hr__break" />

        <div className="box box3">
          <div className="d-flex justify-content-end">
            <div className="footer__logo">
              <img src={process.env.PUBLIC_URL + '/Assets/logo.png'} alt="" />
            </div>
          </div>
          <div>
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
            <div>
              <p className="footer__address d-flex justify-content-end align-items-center gap-1">
                <GoLocation /> Bangalore
              </p>
              <p>© 2023 | NRKids All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="dev d-flex justify-content-center">
        <p>
          <span>developer site: </span>

          <a
            href="https://vamshidharonline.com"
            target="_blank"
            rel="noreferrer"
          >
            vamshidhar dawoor
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
