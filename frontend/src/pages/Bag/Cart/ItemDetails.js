import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';
import axios from 'axios';
import { useCart } from '../../../hooks/useCart';
import DetailsWithoutData from '../../Product/MainProduct/DetailsWithoutData';

const ItemDetails = ({ index, items, cartItems, onDataChange }) => {
  const { updatecart } = useCart();
  const { user } = UseAuthContext();

  const { setSizes, item } = ChangePriceperSize();

  const [userId, setUserId] = useState();
  const [productId, setProductId] = useState();

  const [size, setSize] = useState('');
  const [price, setPrice] = useState();
  const [qty, setQty] = useState();

  const [subTotal, setSubtotal] = useState();

  useEffect(() => {
    setUserId(user.id);
    setProductId(cartItems[index].productId);

    setSize(cartItems[index].size);
    setPrice(cartItems[index].price);
    setQty(cartItems[index].quantity);

    // console.log(size, price, quantity);
  }, []);

  useEffect(() => {
    setSizes(items);
  }, []);

  useEffect(() => {
    setSubtotal(price * qty);
  });

  const changeSize = (itemsize) => {
    setSize(itemsize);
    setSizes(items);

    const i = item.size.indexOf(itemsize);
    // console.log(itemsize);

    let size = itemsize;
    let price;
    if (itemsize === 'none') {
      price = 0;
      setPrice(null);
    } else {
      price = item.price[i];
      setPrice(price);
    }

    let quantity = qty;

    const itemData = { userId, quantity, size, price };

    UpdateCart(itemData);
  };

  const UpdateCart = async (itemData) => {
    const sendingData = { productId, itemData };
    if (productId && itemData) {
      await updatecart(productId, itemData);

      onDataChange(sendingData);
    }
  };

  const decr = () => {
    let quantity;

    if (qty === 1) {
      return;
    } else {
      quantity = qty - 1;
    }
    setQty(quantity);
    const itemData = { userId, quantity, size, price };

    UpdateCart(itemData);
  };

  const incr = () => {
    let quantity = qty + 1;
    setQty(quantity);
    const itemData = { userId, quantity, size, price };

    UpdateCart(itemData);
  };

  return (
    <div className="cart-item-box d-flex w-100 justify-content-between align-items-center">
      <div className="d-flex flex-column p-3 pt-0 position-relative">
        <h6 className="m-0 text-nowrap">{items.title}</h6>
        <p className="m-0">Description</p>

        <div className="size-section mt-5">
          <h6>Size</h6>
          <select
            name="size"
            id="size"
            className="custom-select"
            value={size}
            onChange={(e) => changeSize(e.target.value)}
          >
            {item.size &&
              item.size.map((size, i) => {
                return (
                  <option value={size} key={i} className="custom-option">
                    {size}
                  </option>
                );
              })}
            <option value="none">Not listed</option>
          </select>
        </div>
      </div>

      {price ? (
        <div className="d-flex justify-content-center align-items-start w-100 h-100">
          <div className="w-100 d-flex justify-content-center w-100">
            <p>₹ {price}</p>
          </div>

          <div className="select-quantity d-flex justify-content-end align-items-center w-100">
            <div className="change-qty d-flex">
              <div
                className="qty-button d-flex justify-content-center align-items-center"
                onClick={decr}
              >
                <AiOutlineMinus />
              </div>
              <label>{qty}</label>
              <div
                className="qty-button d-flex justify-content-center align-items-center"
                onClick={incr}
              >
                <AiOutlinePlus />
              </div>
            </div>
          </div>

          <div className="w-100 w-100 d-flex justify-content-center align-items-center text-center">
            <p>₹ {subTotal}</p>
          </div>
        </div>
      ) : (
        <DetailsWithoutData />
      )}
    </div>
  );
};

export default ItemDetails;
