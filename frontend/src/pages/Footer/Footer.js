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
            <Link onClick={handleClick} to="/birthday">
              Birthday
            </Link>
            <Link onClick={handleClick} to="/new-arrivals">
              New Arrivals
            </Link>
            <Link onClick={handleClick} to="/ethnic-wear">
              Ethnic Wear
            </Link>
            <Link onClick={handleClick} to="/party-wear">
              Party Wear
            </Link>
            <Link onClick={handleClick} to="/mom-and-me">
              Mom & me
            </Link>
            <Link onClick={handleClick} to="/casual-wear">
              Casual wear
            </Link>
            <Link onClick={handleClick} to="/siblings-set">
              Siblings set
            </Link>
          </div>
        </div>

        <div className="box box2">
          <div>
            <b>Customer Policy</b>
            <hr />
            <div className="Footer-links">
              <Link to={`nrkids/return-policy`} onClick={handleClick}>
                Return Policy
              </Link>
              <Link
                to={`nrkids/${'terms-and-conditions'}`}
                onClick={handleClick}
              >
                Terms & Condition
              </Link>
              <Link to={`nrkids/cancellation`} onClick={handleClick}>
                Cancellation
              </Link>
            </div>
          </div>
        </div>

        <hr className="hr__break" />

        <div className="box box3">
          <div className="d-flex justify-content-end">
            <div className="footer__logo">
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <img src={process.env.PUBLIC_URL + '/Assets/logo.png'} alt="" />
              </Link>
            </div>
          </div>
          <div>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/nischalareddykids/?igshid=MmIzYWVlNDQ5Yg%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillInstagram className="social-icon" />
              </a>
              <a
                href="https://www.facebook.com/nischalareddykids?mibextid=ZbWKwL"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF className="social-icon" />
              </a>
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
