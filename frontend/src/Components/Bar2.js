import React from 'react';
import '../Styles/Bar2.css';
import {CiDeliveryTruck} from 'react-icons/ci'
import {GiReturnArrow} from 'react-icons/gi'
import {TbReceiptTax} from 'react-icons/tb'
import {RiSecurePaymentFill} from 'react-icons/ri'

const Bar2 = () => {
  return (
    <div className="bar2-container">
      <div className="bar2-content">
        <h3>WE MADE SHOPPING EASY</h3>
        <div className='bar2-boxes'>
          <div className="bar-box"><span className='icon-space'><CiDeliveryTruck/></span>SHIPPING AND DELIVERY</div>
          <div className="bar-box"><span className='icon-space'><GiReturnArrow/></span>EASY RETURNS*</div>
          <div className="bar-box"><span className='icon-space'><TbReceiptTax/></span>TAXES & DUTIES</div>
          <div className="bar-box"><span className='icon-space'><RiSecurePaymentFill/></span>SECURE PAYMENTS</div>
        </div>
      </div>
    </div>
  );
};

export default Bar2;
