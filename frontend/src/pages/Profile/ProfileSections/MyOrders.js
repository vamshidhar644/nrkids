import React, { useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { FetchMongo } from '../../../BackOps/FetchMongo';

const MyOrders = () => {
  const { fetchOrders, orders } = FetchMongo();
  useEffect(() => {
    fetchOrders();
  }, []);

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
        {orders &&
          orders.map((order, i) => {
            const dateStr = order.orderedDate;
            const dateObj = new Date(dateStr);

            // Options for the date format
            const options = { day: 'numeric', month: 'long', year: 'numeric' };

            // Convert the date to the desired format
            const formattedDate = dateObj.toLocaleDateString(
              undefined,
              options
            );
            return (
              <Link
                className="orders-list d-flex justify-content-between p-3 align-items-center"
                key={i}
              >
                <div className="text-center w-100">
                  <p>#{order._id}</p>
                </div>
                <div className="w-100">
                  <p className="text-wrap">{formattedDate}</p>
                </div>
                <div className="text-center w-100">
                  <p>{order.totalAmount}</p>
                </div>
                <div className="order-status-label d-flex align-items-center gap-4">
                  <p>{order.status}</p>
                  <BiChevronRight />
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default MyOrders;
