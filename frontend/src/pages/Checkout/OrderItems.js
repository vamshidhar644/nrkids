import React, { useEffect } from 'react';

import FetchImageUrl from '../../BackOps/FetchImageUrl';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const OrderItems = ({ data, cartItems, itemCount, totalPrice }) => {
  const { getImageUrl } = FetchImageUrl();

  return (
    <div className="checkout-summary">
      <div className="Summary-Section">
        <div className="Checkout-header">
          <h5>ORDER SUMMARY</h5>
        </div>
        <div className="checkout_summary__body">
          <div className="d-flex flex-column gap-2">
            {data
              ? data.map((item, i) => {
                  return (
                    <div className="d-flex w-100 gap-3" key={i}>
                      <div className="checkout-row checkout-image">
                        <img src={getImageUrl(item.images[0])} alt="" />
                      </div>
                      <div className="checkout__info">
                        <h6>{item.title}</h6>
                        <p className="m-0">Description</p>
                        <p className="d-flex gap-3 justify-content-between w-100 m-0">
                          <span>Quantity - {cartItems[i].quantity}</span>
                          <span>Size - {cartItems[i].size}</span>
                        </p>
                        <p>Price - {cartItems[i].price}</p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div>
            <div className="Checkout-body">
              <div className="checkout__row price">
                <h6>Sub Total ({itemCount})</h6>
                <p>₹ {totalPrice}.00</p>
              </div>
              <div className="checkout__row discount">
                <h6>Discount</h6>
                <p></p>
              </div>
              <div className="checkout__row delivery__charges">
                <h6>Delivery Charges</h6>
                <div className="d-flex align-items-center gap-1">
                  <p>will be decided</p>
                  <div className="qstn__container">
                    {/* <p>Delivery cost is decided upon the location of delivery</p> */}
                    <div className="hover-icon">
                      <span className="hover-text">
                        delivery cost is decided upon the location of delivery
                      </span>
                      <AiOutlineQuestionCircle />
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkout__row total-amount">
                <h4>Total Amount</h4>
                <h4>₹ {totalPrice}.00</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
