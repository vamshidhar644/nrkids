import React, { useEffect, useState } from 'react';

import { UseAuthContext } from '../../../hooks/useAuthContext';
import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';
import DetailsWithoutData from './ProductWithoutData';
import './ProductDetails.css';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { PostMongo } from '../../../BackOps/PostMongo';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

import { AiOutlineCloseCircle } from 'react-icons/ai';

const ProductDetails = ({ Product }) => {
  const { updatecart } = PostMongo();
  const { getImageUrl } = FetchImageUrl();
  const { user } = UseAuthContext();
  const [OpenPop, setOpenpop] = useState(false);

  const { setSizes, item } = ChangePriceperSize();

  const [productId, setProdId] = useState();
  const [userId, setUserId] = useState();

  const [size, setSize] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState(1);

  const [buyData, setBuydata] = useState();

  useEffect(() => {
    setProdId(Product.productId);
    setSizes(Product);
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (item.size) {
      setSize(item.size[0]);
    }
  }, [item.size]);

  useEffect(() => {
    if (size) {
      const index = item.size.indexOf(size);
      if (item.price[index]) {
        setPrice(item.price[index]);
      }
    }
  }, [item.size, size]);

  const UpdateCart = async (e) => {
    e.preventDefault();

    if (user) {
      const itemsData = { userId, quantity, size, price };

      if (productId && quantity && size && price) {
        await updatecart(productId, itemsData);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const buyData = { productId, price, quantity, size };
    if (productId && quantity && size && price) {
      setBuydata(buyData);
    }
  }, [price, quantity]);

  return (
    <div className="product-withdata">
      {size !== 'none' && <p className="product-price">₹ {price}.00</p>}
      <div className="item-specifications d-flex">
        <div className="select-quantity d-flex ">
          <p className="m-0">Quantity </p>
          <div className="change-qty d-flex">
            <div
              className="qty-button align-items-center"
              onClick={() => (quantity === 1 ? null : setQty(quantity - 1))}
            >
              <AiOutlineMinus />
            </div>
            <label>{quantity}</label>
            <div
              className="qty-button align-items-center"
              onClick={() => setQty(quantity + 1)}
            >
              <AiOutlinePlus />
            </div>
          </div>
        </div>
        <div className="size-section align-items-center">
          <div className="select-size d-flex">
            <p className="m-0">Size </p>
            <select
              name="size"
              id="size"
              className="custom-select"
              value={size}
              onChange={(event) => setSize(event.target.value)}
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
          {Product.sizeguide ? (
            <p
              className="size-guide text-nowrap m-0 small pt-2"
              onClick={() => setOpenpop(!OpenPop)}
            >
              Size guide
            </p>
          ) : null}
          {OpenPop && (
            <div className="popup">
              <div className="popup-content position-relative">
                <img src={getImageUrl(Product.sizeguide)} alt="" width />
                <p
                  className="close__icon m-0"
                  onClick={() => setOpenpop(!OpenPop)}
                >
                  <AiOutlineCloseCircle />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {size === 'none' ? (
        <DetailsWithoutData Product={Product} />
      ) : (
        <div className="product-buttons d-flex">
          <button
            className="product-button cart-button d-flex justify-content-center align-items-center"
            onClick={UpdateCart}
          >
            {/* <BsHandbag className="product-icon" /> */}
            Add to Cart
          </button>
          &nbsp;
          <Link
            className="product-button d-flex justify-content-center align-items-center"
            to="/check-out"
            state={{ data: buyData }}
          >
            Buy now
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
