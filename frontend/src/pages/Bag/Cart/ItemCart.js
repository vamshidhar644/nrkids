import React, { useEffect, useState } from 'react';

import { UseAuthContext } from '../../../hooks/useAuthContext';
import { useCart } from '../../../hooks/useCart';
import './ItemCart.css';
import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';

const ItemCart = ({ item, cartItems, index, sendData }) => {
  const { updatecart } = useCart();
  const { setPriceperSize, itemprice, OoStock } = ChangePriceperSize();
  const { user } = UseAuthContext();

  const [productId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setProdId(cartItems[index].productId);
      setPrice(cartItems[index].price);
      setSize(cartItems[index].size);
      setQty(cartItems[index].quantity);
    }
  }, []);

  useEffect(() => {
    const setPricing = (size) => {
      setPriceperSize(item.prices, size);
    };

    setPricing(size);
  });

  useEffect(() => {
    const itemData = { userId, quantity, size, price };
    // console.log(item);
    const updateCart = async () => {
      if (productId && itemData) {
        await updatecart(productId, itemData);
        const reqData = { productId, quantity, size, price };
        sendData(reqData);
      }
    };
    if ((productId && userId, quantity, size, price)) {
      updateCart();
    }
  }, [productId, userId, quantity, size, itemprice]);

  const handleQtyChange = (event) => {
    const intValue = parseInt(event.target.value, 10);
    if (!isNaN(intValue)) {
      setQty(intValue);
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPrice(itemprice);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-box">
        <div className="item-details">
          <h6>{item.title}</h6>
          {!OoStock && <p className="product-price">₹ {price}</p>}
          {OoStock && <p className="product-price">Out of Stock</p>}
          <div className="item-desc">
            <div className="size-section">
              <h6>Size</h6>
              <select
                name="size"
                id="size"
                className="size-select"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="xxxl">XXXL</option>
              </select>
            </div>
            <div className="qty-section">
              <h6>Quantity</h6>
              <select
                name="quantity"
                id="quantity"
                className="qty-select"
                value={quantity}
                onChange={handleQtyChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
