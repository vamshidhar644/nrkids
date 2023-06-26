import React from 'react';
import './Bars.css';

import { TbTruckDelivery } from 'react-icons/tb';
import { RiSecurePaymentFill } from 'react-icons/ri';

export const Bar1 = () => {
  return (
    <div className="bar-content">
      <h3>MADE TO FIT PERFECTLY</h3>
      <p>
        We want to make sure your garment fits perfeclty. Just select "Custom
        size" while adding the items.
      </p>
    </div>
  );
};

export const Bar2 = () => {
  return (
    <div className="bar-content">
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
              <RiSecurePaymentFill />
            </span>
            SECURE PAYMENTS
          </div>
        </div>
    </div>
  );
};
