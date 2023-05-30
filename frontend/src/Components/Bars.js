import React from 'react';
import '../Styles/Bars.css';

import { TbTruckDelivery } from 'react-icons/tb';
import { GiReturnArrow } from 'react-icons/gi';
import { TbReceiptTax } from 'react-icons/tb';
import { RiSecurePaymentFill } from 'react-icons/ri';

export const Bar1 = () => {
  return (
    <div className="bar-container">
      <div className="bar-content bar1">
        <div className="bar1-box">
          <h3>MADE TO FIT PERFECTLY</h3>
          <p>
            We want to make sure your garment fits perfeclty. Just select
            "Custom size" while adding the items. <a href="">More details</a>
          </p>
        </div>
        <p className="mid-line"></p>
        <div className="bar1-box">
          <h3>SEAMLESS VIDEO SHOPPING</h3>
          <p>Whats app</p>
          <p>+91 1234567890</p>
        </div>
      </div>
    </div>
  );
};

export const Bar2 = () => {
  return (
    <div className="bar-container">
      <div className="bar-content bar2">
        <h3>WE MADE SHOPPING EASY</h3>
        <div className="bar-box2">
          <div className="bar-box">
            <span className="icon-space">
              <TbTruckDelivery />
            </span>
            SHIPPING & DELIVERY
          </div>
          <div className="bar-box">
            <span className="icon-space">
              <GiReturnArrow />
            </span>
            EASY RETURNS*
          </div>
          <div className="bar-box">
            <span className="icon-space">
              <TbReceiptTax />
            </span>
            TAXES & DUTIES
          </div>
          <div className="bar-box">
            <span className="icon-space">
              <RiSecurePaymentFill />
            </span>
            SECURE PAYMENTS
          </div>
        </div>
      </div>
    </div>
  );
};