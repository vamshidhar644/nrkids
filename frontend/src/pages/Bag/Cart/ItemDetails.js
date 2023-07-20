import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { UseAuthContext } from '../../../hooks/useAuthContext';

import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';

import DetailsWithoutData from '../../Product/MainProduct/ProductWithoutData';
import { PostMongo } from '../../../BackOps/PostMongo';
import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const ItemDetails = ({ index, items, cartItems, onDataChange }) => {
  const { updatecart } = PostMongo();
  const { getImageUrl } = FetchImageUrl();
  const { user } = UseAuthContext();

  const { setSizes, item } = ChangePriceperSize();

  const [userId, setUserId] = useState();
  const [productId, setProductId] = useState();

  const [size, setSize] = useState('');
  const [price, setPrice] = useState();
  const [qty, setQty] = useState();

  const [subTotal, setSubtotal] = useState();

  useEffect(() => {
    setUserId(user._id);
    setProductId(cartItems[index].productId);

    setSize(cartItems[index].size);
    setPrice(cartItems[index].price);
    setQty(cartItems[index].quantity);
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
    <div className="cart_item__main_box d-flex justify-content-between">
      <div className="cart_item__box child1">
        <Link
          className="cart_image__container"
          to={`/${items.dropdownField}/${items.path.current}`}
          key={index}
        >
          <img src={getImageUrl(items.images[0])} alt="" />
        </Link>
        <div className="cart_item__info d-flex flex-column">
          <h6 className="m-0">{items.title}</h6>
          <p className="m-0">Description</p>

          <div className="size__section d-flex align-items-center gap-2 pt-3">
            <p className="m-0">Size</p>
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
      </div>

      {price ? (
        <div className="child2 cart_item_details_box d-flex justify-content-around h-100">
          <p>₹ {price}.00</p>

          <div className="select-quantity d-flex justify-content-center align-items-center">
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

          <p>₹ {subTotal}.00</p>
        </div>
      ) : (
        <DetailsWithoutData Product={items} />
      )}
    </div>
  );
};

export default ItemDetails;
