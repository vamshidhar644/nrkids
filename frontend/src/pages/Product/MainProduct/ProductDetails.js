import React, { useEffect, useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';
import DetailsWithoutData from './DetailsWithoutData';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ProductDetails = ({ Product }) => {
  const { updatecart } = useCart();
  const { user } = UseAuthContext();

  const { setSizes, item } = ChangePriceperSize();

  const [productId, setProdId] = useState();
  const [userId, setUserId] = useState();

  const [size, setSize] = useState('');
  const [price, setPrice] = useState();

  const [quantity, setQty] = useState(1);

  useEffect(() => {
    setProdId(Product.productId);
    if (user) {
      setUserId(user.id);
    }
    setSizes(Product);
  }, [Product.productId, user]);

  useEffect(() => {
    if (item.size) {
      setSize(item.size[0]);
    }
  }, [item.size]);

  useEffect(() => {
    if (size) {
      const index = item.size.indexOf(size);
      setPrice(item.price[index]);
    }
  }, [item.size, size]);

  const UpdateCart = async (e) => {
    e.preventDefault();

    if (user) {
      const itemsData = { userId, quantity, size, price };
      console.log(itemsData);
      console.log(itemsData);
      await updatecart(productId, itemsData);
    }
  };
  return (
    <div className="product-details">
      {price && <p className="product-price">₹ {price}</p>}
      <div className="item-desc">
        <div className="quantity-section d-flex justify-content-center align-items-center">
          <h6>Quantity</h6>
          <div className="change-qty d-flex">
            <div
              className="qty-button"
              onClick={() => (quantity === 1 ? null : setQty(quantity - 1))}
            >
              <AiOutlineMinus />
            </div>
            <label>{quantity}</label>
            <div className="qty-button" onClick={() => setQty(quantity + 1)}>
              <AiOutlinePlus />
            </div>
          </div>
        </div>
        <div className="size-section d-flex flex-column">
          <div className="select-size">
            <h6>Size</h6>
            <select
              name="size"
              id="size"
              className="size-select"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              {item.size &&
                item.size.map((size, i) => {
                  return (
                    <option value={size} key={i}>
                      {size}
                    </option>
                  );
                })}
              <option value="none">Not listed</option>
            </select>
          </div>
          <p className="size-guide">Size guide</p>
        </div>
        {/* <div className="qty-section">
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
        </div> */}
      </div>
      {size === 'none' ? (
        <DetailsWithoutData />
      ) : (
        <div>
          <button className="add-to-cart-button" onClick={UpdateCart}>
            Add to Cart
          </button>
          &nbsp;
          <button className="add-to-cart-button">Buy now</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
