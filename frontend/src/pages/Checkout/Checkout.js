import React, { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

import OrderAddress from './OrderAddress';
import OrderItems from './OrderItems';
import FilterSanity from '../../helpers/FilterSanity';
import { Calcuate } from '../../helpers/Calcuate';
import './Checkout.css';

const Checkout = ({ Products }) => {
  const location = useLocation();
  const { data = null } = location.state || {};
  const { filtersanity, filteredItems } = FilterSanity();
  const { totalPricing, itemCount, totalPrice } = Calcuate();
  document.title = 'NRKids | Checkout';
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
        <p className="checkout__path d-flex justify-content-start align-items-center">
          <Link to="/">Home </Link>
          <BiChevronRight /> <Link to="/your-bag">Shopping cart </Link>
          <BiChevronRight /> Checkout
        </p>
        <div className="cart-header">
          <h1>Checkout</h1>
        </div>
      </div>
      <div className="checkout__body d-flex justify-content-between">
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
