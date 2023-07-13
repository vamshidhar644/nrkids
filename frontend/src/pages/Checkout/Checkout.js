import React, { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

import OrderAddress from './Address/OrderAddress';
import OrderItems from './CartItems/OrderItems';
import FilterSanity from '../../BackOps/FilterSanity';
import { Calcuate } from '../../BackOps/Calcuate';
import './Checkout.css';

const Checkout = ({ Products }) => {
  const location = useLocation();
  const { data = null } = location.state || {};
  const { filtersanity, filteredItems } = FilterSanity();
  const { totalPricing, itemCount, totalPrice } = Calcuate();

  useEffect(() => {
    filtersanity(data, Products);
  }, [data]);

  useEffect(() => {
    totalPricing(data);
  }, [data]);

  if (filteredItems) {
    if (filteredItems.length === 0) {
      return <Navigate to="/your-bag" />;
    }
  }
  return (
    <div className="p-4">
      <div>
        <p className="d-flex justify-content-start align-items-center gap-2 small">
          <Link to="/">Home </Link>
          <BiChevronRight /> <Link to="/your-bag">Shopping cart </Link>
          <BiChevronRight /> Checkout
        </p>
        <div className="cart-header pt-4 pb-3">
          <h1>Checkout</h1>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-around">
        <OrderAddress
          data={filteredItems}
          cartItems={data}
          totalPrice={totalPrice}
        />
        <OrderItems
          data={filteredItems}
          cartItems={data}
          itemCount={itemCount}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default Checkout;
