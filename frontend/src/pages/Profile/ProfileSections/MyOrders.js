import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  return (
    <div className="orders-container w-100 d-flex flex-column">
      <div className="orders-header d-flex justify-content-evenly">
        <div className="w-100 text-center">
          <p>Order ID</p>
        </div>
        <div className="w-100 text-center">
          <p>Date</p>
        </div>
        <div className="w-100 text-center">
          <p className="order-price-label">Price</p>
        </div>
        <div className="w-100 text-center">
          <p>Status</p>
        </div>
      </div>
      <hr className="m-0" />
      <div className="orders-body d-flex flex-column gap-3 pt-3">
        <Link className="orders-list d-flex justify-content-between p-3 align-items-center">
          <div className="text-center w-100">
            <p>#874522648</p>
          </div>
          <div className="w-100">
            <p className="text-wrap">September 5, 2020</p>
          </div>
          <div className="text-center w-100">
            <p>₹ 218.50</p>
          </div>
          <div className="order-status-label d-flex align-items-center gap-4">
            <p>Yet to pay</p>
            <BiChevronRight />
          </div>
        </Link>
        <Link className="orders-list d-flex justify-content-between p-3 align-items-center">
          <div className="text-center w-100">
            <p>#874522648</p>
          </div>
          <div className="w-100">
            <p className="text-wrap">September 5, 2020</p>
          </div>
          <div className="text-center w-100">
            <p>₹ 218.50</p>
          </div>
          <div className="order-status-label d-flex align-items-center gap-4">
            <p>Paid</p>
            <BiChevronRight />
          </div>
        </Link>
        <Link className="orders-list d-flex justify-content-between p-3 align-items-center">
          <div className="text-center w-100">
            <p>#874522648</p>
          </div>
          <div className="w-100">
            <p className="text-wrap">September 5, 2020</p>
          </div>
          <div className="text-center w-100">
            <p>₹ 218.50</p>
          </div>
          <div className="order-status-label d-flex align-items-center gap-4">
            <p>Cancelled</p>
            <BiChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyOrders;
