import React, { useEffect, useState } from 'react';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const OrderItems = ({ data, cartItems }) => {
  console.log(cartItems);

  const { getImageUrl } = FetchImageUrl();

  const [totalPrice, setTotalPrice] = useState();
  const [itemCount, setItemCount] = useState();
  useEffect(() => {
    const totalPricing = () => {
      let price = 0;
      let Arrayel = [];
      if (cartItems) {
        Arrayel = cartItems.filter((item) => item.price !== 0);
      }

      if (Arrayel) {
        for (let i = 0; i < Arrayel.length; i++) {
          price += Arrayel[i].price * Arrayel[i].quantity;
        }

        setTotalPrice(price);

        const ArrayLength = Arrayel.length;

        if (ArrayLength === 1) {
          setItemCount(ArrayLength + ' item');
        } else {
          setItemCount(ArrayLength + ' items');
        }
      }
    };

    totalPricing();
  }, [cartItems]);
  return (
    <div className="checkout-summary">
      <div className="Summary-Section">
        <div className="Checkout-header">
          <h5>ORDER SUMMARY</h5>
        </div>
        <div className="Checkout-body">
          <div className="d-flex flex-column gap-2">
            {data
              ? data.map((item, i) => {
                  return (
                    <div className="d-flex w-100 gap-3" key={i}>
                      <div className="checkout-row checkout-image">
                        <img src={getImageUrl(item.images[0])} alt="" />
                      </div>
                      <div className=''>
                        <h6>{item.title}</h6>
                        <p className="m-0 small">Description</p>
                        <p className="d-flex gap-3 justify-content-between w-100 m-0 small">
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
          <hr />
          <div>
            <div className="checkout-row price">
              <h6>Sub Total ({itemCount})</h6>
              <p>₹ {totalPrice}</p>
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
  );
};

export default OrderItems;
