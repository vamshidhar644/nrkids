import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import FetchImageUrl from '../../BackOps/FetchImageUrl';
import { BiChevronRight } from 'react-icons/bi';
import OrderAddress from './Address/OrderAddress';
import { UseAuthContext } from '../../hooks/useAuthContext';
import ParentLogin from '../Login/ParentLogin';

const Buynow = ({ Products }) => {
  const { user } = UseAuthContext();
  const { getImageUrl } = FetchImageUrl();
  const location = useLocation();
  const { data = null } = location.state || {};

  const [filteredItems, setFilteredItems] = useState();
  useEffect(() => {
    const sanitycart = [];
    if (Products) {
      Products.forEach((product) => {
        if (data.productId === product.productId) {
          sanitycart.push(product);
        }
      });
    }
    if (sanitycart) {
      setFilteredItems(sanitycart);
    }
  }, [Products]);

  if (filteredItems) {
    if (filteredItems.length === 0) {
      return <Navigate to="/your-bag" />;
    }
  }
  return (
    <div className="p-4">
      {user ? (
        <div>
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
              totalPrice={data.price}
            />
            {filteredItems ? (
              <div className="checkout-summary">
                <div className="Summary-Section">
                  <div className="Checkout-header">
                    <h5>ORDER SUMMARY</h5>
                  </div>
                  <div className="Checkout-body">
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex w-100 gap-3">
                        <div className="checkout-row checkout-image">
                          <img
                            src={getImageUrl(filteredItems[0].images[0])}
                            alt=""
                          />
                        </div>
                        <div className="">
                          <h6>{filteredItems.title}</h6>
                          <p className="m-0 small">Description</p>
                          <p className="d-flex gap-3 justify-content-between w-100 m-0 small">
                            <span>Quantity - {data.quantity}</span>
                            <span>Size - {data.size}</span>
                          </p>
                          <p>Price - {data.price}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="checkout-row price">
                        <h6>Sub Total (1 item)</h6>
                        <p>₹ {data.price}</p>
                      </div>
                      <div className="checkout-row discount">
                        <h6>Discount</h6>
                        <p></p>
                      </div>
                      <div className="checkout-row delivery-charges">
                        <h6>Delivery Charges</h6>
                        <p></p>
                      </div>
                      <div className="checkout-row total-amount">
                        <h4>Total Amount</h4>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* <OrderItems data={filteredItems} cartItems={data} /> */}
          </div>
        </div>
      ) : (
        <ParentLogin />
      )}
    </div>
  );
};

export default Buynow;
