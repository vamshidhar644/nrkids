import React from 'react';
import './Bars.css';

import { TbTruckDelivery } from 'react-icons/tb';
import { RiSecurePaymentFill } from 'react-icons/ri';

export const Bar1 = () => {
  return (
    <div className="bar-content text-center p-4">
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
    <div className="bar-content text-center p-3">
      <h3>WE MADE SHOPPING EASY</h3>
      <div className="w-100 d-flex justify-content-around align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <span className="icon-space p-2">
            <TbTruckDelivery />
          </span>
          SHIPPING & DELIVERY
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <span className="icon-space p-2">
            <RiSecurePaymentFill />
          </span>
          SECURE PAYMENTS
        </div>
      </div>
    </div>
  );
};
